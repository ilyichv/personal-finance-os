import "server-only";

import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { nanoid } from "~/lib/utils";
import { auth } from "@clerk/nextjs";
import { type Chat } from "~/lib/types";
import {
  BotCard,
  BotMessage,
  SpinnerMessage,
  SystemMessage,
  UserMessage,
} from "~/components/chat/message";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  CreateTransactionMessage,
  CreateTransactionMessageSkeleton,
} from "~/components/chat/create-transaction-message";
import { type Category } from "~/server/db/schema";
import { getDate } from "~/lib/chat/utils";
import { spinner } from "~/components/chat/spinner";
import { api } from "~/trpc/server";

async function confirmTransactionCreation({
  name,
  type,
  amount,
  categoryId,
  date,
}: {
  name: string;
  type: "income" | "outcome";
  amount: number;
  categoryId: number | null;
  date: Date;
}) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const creating = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">Creating transaction...</p>
    </div>,
  );

  const systemMessage = createStreamableUI(null);

  creating.update(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Creating transaction for <strong>{name}</strong>...
      </p>
    </div>,
  );

  await api.transaction.create({
    name,
    type,
    amount,
    categoryId,
    date,
  });

  creating.done(
    <div>
      <p className="mb-2">You have created a transaction for {name}.</p>
    </div>,
  );

  systemMessage.done(
    <SystemMessage>Transaction for {name} has been created.</SystemMessage>,
  );

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages.slice(0, -1),
      {
        id: nanoid(),
        role: "function",
        name: "showCreateTransaction",
        content: JSON.stringify({
          name,
          type,
          amount,
          categoryId,
          date,
        }),
      },
      {
        id: nanoid(),
        role: "system",
        content: `[User has created a transaction for ${name} with amount ${amount} and type ${type} on ${date.toISOString()}]`,
      },
    ],
  });

  return {
    creatingUI: creating.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  };
}

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    initial: <SpinnerMessage />,
    system: `\
    You are a personal finance conversation bot and you can help users to track their finances.
    You and the user can discuss user's transactions and the user can create or list their transactions, in the UI.
    
     Messages inside [] means that it's a UI element or a user event. For example:
    - "[User has created a transaction for Apples with amount 5 and type outcome on 2024-06-07]" means that the user has created a transaction in the UI.
    
    If the user requests adding a transaction, call \`show_add_transaction_ui\` to show the transaction insert UI.
    
    Besides that, you can also chat with users and do some calculations if needed.`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      showAddTransaction: {
        description:
          "Show the UI to add a transaction. Use this if the user wants to add a transaction.",
        parameters: z.object({
          name: z.string().describe("The name of the transaction."),
          type: z
            .enum(["income", "outcome"])
            .describe("The type of the transaction (income/outcome)."),
          amount: z.number().describe("The amount of the transaction."),
          category: z.string().describe("The category of the transaction."),
          date: z
            .string()
            .describe(
              "The date of the transaction. Can assume `today`, `yesterday`, `` values if the date is not explicit.",
            ),
        }),
        generate: async function* ({ amount, type, name, date, category }) {
          yield (
            <BotCard>
              <CreateTransactionMessageSkeleton />
            </BotCard>
          );

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "function",
                name: "showAddTransaction",
                content: JSON.stringify({
                  amount,
                  type,
                  name,
                  date,
                  category,
                }),
              },
            ],
          });

          // todo: category guessing
          const matchedCategory = aiState
            .get()
            .categories.find(
              (c) => c.name.toLowerCase() === category.toLowerCase(),
            );

          return (
            <BotCard>
              <CreateTransactionMessage
                amount={amount}
                type={type}
                name={name}
                date={getDate(date)}
                category={matchedCategory}
              />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};

export type AIState = {
  chatId: string;
  messages: Message[];
  categories: Category[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];
export const AI = createAI<AIState, UIState>({
  actions: {
    confirmTransactionCreation,
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [], categories: [] },
  onGetUIState: async () => {
    "use server";

    const { userId } = auth();
    if (userId) {
      const aiState = getAIState();

      if (aiState) {
        return getUIStateFromAIState(aiState);
      }
    } else return;
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display: getDisplay(message),
    }));
};

const getDisplay = (message: Message) => {
  if (message.role === "function") {
    return null;
  }
  if (message.role === "user")
    return <UserMessage>{message.content}</UserMessage>;

  return <BotMessage content={message.content} />;
};

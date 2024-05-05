"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "~/lib/utils";
import { type AI } from "~/lib/chat/actions";
import { UserMessage } from "~/components/chat/message";

export function Chat() {
  const { submitUserMessage } = useActions();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [input, setInput] = useState("");

  return (
    <div className="flex h-full w-full flex-col border-l">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div key={message.id}>{message.display}</div>
          ))}
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const value = input.trim();
          setInput("");
          if (!value) return;

          // Optimistically add user message UI
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: nanoid(),
              display: <UserMessage>{value}</UserMessage>,
            },
          ]);

          // Submit and get response message
          const responseMessage = await submitUserMessage(value);
          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);
        }}
        className="border-t border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            placeholder="Type your message..."
            type="text"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}

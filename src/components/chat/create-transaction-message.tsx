"use client";

import { Button } from "~/components/ui/button";
import { type Category, type Transaction } from "~/server/db/schema";
import { useActions, useUIState } from "ai/rsc";
import { type AI } from "~/lib/chat/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateTransactionMessage({
  props: { amount, type, name, date, category },
}: {
  props: {
    amount: Transaction["amount"];
    type: Transaction["type"];
    name: Transaction["name"];
    date: Transaction["date"];
    category: Category | undefined;
  };
}) {
  const router = useRouter();
  const { confirmTransactionCreation } = useActions();
  const [creatingUI, setCreatingUI] = useState<null | React.ReactNode>(null);
  const [, setMessages] = useUIState<typeof AI>();

  if (creatingUI) return creatingUI;

  return (
    <>
      <div className="grid gap-4">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(date)}
            </div>
          </div>
          <div className="text-sm font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(type === "income" ? amount : -amount)}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="space-y-1">
            <div className="text-sm"></div>
          </div>
          {category && (
            <div className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">
              {category.name}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline">
          Delete
        </Button>
        <Button
          size="sm"
          onClick={async () => {
            const response = await confirmTransactionCreation({
              name,
              type,
              amount,
              categoryId: category?.id ?? null,
              date,
            });
            setCreatingUI(response.creatingUI);

            // Insert a new system message to the UI.
            setMessages((currentMessages: any) => [
              ...currentMessages,
              response.newMessage,
            ]);

            router.refresh();
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
}

export function CreateTransactionMessageSkeleton() {
  return "Loading...";
}

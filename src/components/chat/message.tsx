"use client";

import { type StreamableValue } from "ai/rsc";
import { cn } from "~/lib/utils";
import { useStreamableText } from "~/lib/hooks/use-streamable-text";
import { spinner } from "~/components/chat/spinner";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3/4 ml-auto w-fit rounded-lg bg-primary p-2 text-left text-sm text-white">
      {children}
    </div>
  );
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div
      className={cn(
        "max-w-3/4 mr-auto w-fit rounded-lg bg-gray-100 p-2 text-left text-sm text-gray-800",
        className,
      )}
    >
      {text}
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit rounded-lg p-2 text-left text-xs text-gray-400">
      {children}
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="max-w-3/4 mr-auto w-fit rounded-lg bg-gray-100 p-2 text-left text-sm">
      {spinner}
    </div>
  );
}

export function BotCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mr-auto w-full rounded-lg bg-gray-100 p-2 text-left text-sm">
      {children}
    </div>
  );
}

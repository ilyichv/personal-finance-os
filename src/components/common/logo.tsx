import { CoinsIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold", className)}>
      <CoinsIcon className="h-6 w-6" />
      <span>Personal Finance OS</span>
    </div>
  );
}

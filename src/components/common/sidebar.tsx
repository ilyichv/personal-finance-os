"use client";

import Link from "next/link";
import { ArrowLeftRightIcon, CoinsIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { TransactionFormDialog } from "~/components/transaction/transactions-form";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <ArrowLeftRightIcon className="h-4 w-4" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <CoinsIcon className="h-6 w-6" />
            <span className="">Personal Finance OS</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <div className="mb-4 px-4">
            <TransactionFormDialog />
          </div>
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map(({ label, href, icon }) => (
              <Link
                key={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === href && "bg-gray-100 text-gray-900",
                )}
                href={href}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

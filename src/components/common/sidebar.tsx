import Link from "next/link";
import { TransactionFormDialog } from "~/components/transaction/transactions-form";
import { routes } from "~/constants/sidebar";
import { api } from "~/trpc/server";
import { SidebarItem } from "~/components/common/sidebar-item";
import { Logo } from "~/components/common/logo";
import { auth } from "~/auth";

export async function Sidebar() {
  const categories = await api.category.getAll();
  const session = await auth();

  if (!session?.user) return;

  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <div className="mb-4 px-4">
            <TransactionFormDialog
              categories={categories}
              user={session.user}
            />
          </div>
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map((route) => (
              <SidebarItem key={route.href} {...route} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

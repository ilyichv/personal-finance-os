import Link from "next/link";
import { Input } from "~/components/ui/input";
import { CoinsIcon, MenuIcon, SearchIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { routes } from "~/constants/sidebar";
import { SignoutButton } from "~/components/common/signout-button";
import { Logo } from "~/components/common/logo";

export function Header() {
  return (
    <header className="flex h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#">
            <Logo />
          </Link>
          <nav className="mt-8 grid gap-2 text-lg font-medium">
            {routes.map(({ label, href, icon }) => (
              <Link
                key={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={href}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </div>
      <SignoutButton />
    </header>
  );
}

import Link from "next/link";
import { Input } from "~/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Package2Icon, SearchIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </div>
      <UserButton />
    </header>
  );
}

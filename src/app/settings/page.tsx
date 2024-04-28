import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CreateCategory } from "~/components/category/create-category";
import { api } from "~/trpc/server";

export default async function Settings() {
  const categories = await api.category.getAll();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold md:text-xl">Settings</h1>
      </div>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Categories</CardTitle>
          <CardDescription>Categorize your transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <CreateCategory categories={categories} />
        </CardContent>
      </Card>
    </main>
  );
}

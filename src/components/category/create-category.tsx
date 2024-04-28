"use client";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Category } from "~/server/db/schema";

export function CreateCategory({ categories }: { categories: Category[] }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const deleteCategory = api.category.deleteCategory.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory.mutate({ name });
  };

  const handleDelete = (id: number) => {
    deleteCategory.mutate({ id });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t px-4 py-2"
      >
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="flex-1 appearance-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter category"
        />
        <Button type="submit" className="ml-auto" size="icon" variant="ghost">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>
      </form>
      <div className="border-t">
        {categories.map(({ id, name }) => (
          <div key={id} className="flex items-center gap-2 px-4 py-2">
            <span className="font-medium">{name}</span>
            <Button
              onClick={() => handleDelete(id)}
              className="ml-auto"
              size="icon"
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

import { auth, signOut } from "~/auth";
import { LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";

export async function SignoutButton() {
  const session = await auth();

  if (!session) return null;

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button size="icon" variant="ghost" type="submit">
        <LogOut className="size-4" />
      </Button>
    </form>
  );
}

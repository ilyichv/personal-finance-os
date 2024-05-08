import { signIn } from "~/auth";
import { providerMap } from "~/auth.config";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/common/logo";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default async function SignInPage() {
  return (
    <div className="mx-auto max-w-sm space-y-8 py-12">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Card>
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Welcome back! Sign in to your account.
          </p>
          <div className="mt-16 flex flex-col gap-2">
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  await signIn(provider.id, { redirectTo: "/" });
                }}
              >
                <Button className="w-full" type="submit">
                  Sign in with {provider.name}
                </Button>
              </form>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

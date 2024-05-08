import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { type Provider } from "@auth/core/providers";

const providers: Provider[] = [GitHub];
export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
export default { providers } satisfies NextAuthConfig;

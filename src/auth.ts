import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import authConfig from "~/auth.config";

export const { auth, handlers, signOut, signIn } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

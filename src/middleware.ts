import authConfig from "./auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    return Response.redirect(`${req.nextUrl.origin}/signin`);
  }
});

export const config = {
  matcher: ["/", "/transactions", "/settings"],
};

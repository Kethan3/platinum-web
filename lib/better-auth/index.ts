import { serverUrl } from "@/lib/environment";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const betterAuthClient = createAuthClient({
  baseURL: serverUrl,
  basePath: "/authentications",
  plugins: [nextCookies()],
});
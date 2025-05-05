import { serverUrl } from "@/lib/environment";
import { createAuthClient } from "better-auth/react";

export const betterAuthClient = createAuthClient({
  baseURL: serverUrl,
  basePath: "/authentications",
});
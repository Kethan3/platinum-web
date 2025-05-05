import { createAuthClient } from "better-auth/react";
import { serverUrl } from "../environment";


export const betterAuthClient = createAuthClient({
    baseURL : serverUrl,
    basePath : "authentication"
})
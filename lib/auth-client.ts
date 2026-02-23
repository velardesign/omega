"use client"
import {createAuthClient} from "better-auth/react";

const authBaseURL =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    (typeof window !== "undefined" && window.location.origin) ||
    "http://localhost:3000";
 // ← debug
console.log("[BetterAuth] VERCEL_URL:", process.env.VERCEL_URL);       // ← debug
console.log("[BetterAuth] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL); // ← debug
export const authClient = createAuthClient({
    baseURL: authBaseURL,
});
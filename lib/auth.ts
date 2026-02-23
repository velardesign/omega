import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma"

const appUrl =
    process.env.BETTER_AUTH_URL ||
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

console.log("[BetterAuth] appUrl calculado:", appUrl);                 // ← debug
console.log("[BetterAuth] VERCEL_URL:", process.env.VERCEL_URL);       // ← debug
console.log("[BetterAuth] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL); // ← debug
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    baseURL: appUrl,
    trustedOrigins: [
        appUrl,
    ].filter(Boolean),
});
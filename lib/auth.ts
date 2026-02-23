import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma"

const appUrl =
    process.env.BETTER_AUTH_URL || "http://localhost:3000";

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
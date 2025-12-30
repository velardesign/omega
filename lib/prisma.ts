import "dotenv/config";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";
import {PrismaClient} from "@/generated/prisma/client"

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 20
});

declare global {
    var prisma : PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({adapter});

if(process.env.NODE_ENV !== "production"){
    global.prisma = prisma;
}
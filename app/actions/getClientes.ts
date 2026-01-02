"use server"
import { prisma } from "@/lib/prisma";
export async function getClientes() {
    return await prisma.clientes.findMany();
}
"use server"
import {revalidatePath} from "next/cache";
import {Prisma} from "@/generated/prisma/client";
import {ProdutoServices} from "@/src/application/services/produto-services";
import {ProdutoDTO} from "@/src/domain/types/produto-types";

const services = ProdutoServices.getInstance();

export async function addProduto(produto :ProdutoDTO) {

    try {

        await services.addProduto(produto);
        revalidatePath("/dashboard/produto/adiciona");
        return {success: true};

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === "P2002") {

                const driverError: any = (error.meta as any)?.driverAdapterError;
                const index: string = driverError?.cause?.constraint?.index ?? "";
                const rawField: string = index.replace(/_key$/, "");

                const fieldMap: Record<string, { field: string, message: string }> = {
                    codigo: {
                        field: "Código",
                        message: "Código já cadastrado no sistema",
                    },

                }

                const entry = fieldMap[rawField];

                return {
                    success:false,
                    error: entry?.message?? `Já existe um produto com este código: ${rawField}`
                }
            }
        }
        return {
            success: false,
            error: "Erro interno ao salvar produto"
        }
    }

}
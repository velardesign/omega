"use server"
import {fornecedorCriarSchema} from "@/schemas/fornecedor-criar-schema";
import {FornecedorServices} from "@/src/application/services/fornecedor-services";
import {revalidatePath} from "next/cache";
import {Prisma} from "@/generated/prisma/client";

const services = FornecedorServices.getInstance();

export async function addFornecedor(formData: unknown) {
    const data = fornecedorCriarSchema.parse(formData);
    try {
        await services.addFornecedor(data);
        revalidatePath("/dashboard/fornecedores/cadastrar-fornecedor")
        return {success: true};
    } catch (error) {
        console.log("ERRO COMPLETO:", JSON.stringify(error, null, 2));
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                const driverError = (error.meta as any)?.driverAdapterError;
                const index: string = driverError?.cause?.constraint?.index ?? "";
                const rawField = index.replace(/_key$/, "");

                const fieldMap: Record<string, { field: string; message: string }> = {
                    fornecedor_razao_social: {
                        field: "Razão social",
                        message: "Já existe um fornecedor cadastrado com essa Razão social.",
                    },
                    fornecedor_cnpj: {
                        field: "CNPJ",
                        message: "Já existe um fornecedor cadastrado com esse CNPJ.",
                    },
                    fornecedor_email: {
                        field: "E-mail",
                        message: "Já existe um fornecedor cadastrado com esse E-mail.",
                    },
                    fornecedor_chave_pix: {
                        field: "Chave PIX",
                        message: "Já existe um fornecedor cadastrado com essa Chave PIX.",
                    },
                    fornecedor_nome_fantasia: {
                        field: "Nome fantasia",
                        message: "Já existe um fornecedor cadastrado com esse Nome fantasia.",
                    },
                };

                const entry = fieldMap[rawField];

                return {
                    success: false,
                    error: entry?.message ?? `Já existe um fornecedor com o campo duplicado: ${rawField}`,
                };
            }
        }
        return {
            success: false,
            error: "Erro interno ao salvar fornecedor"
        };
    }
}

export async function listarTodosFornecedores() {
    return await services.listaFornecedores();
}
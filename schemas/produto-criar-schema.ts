import {z} from "zod"

export const produtoCriarSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "Nome do Produto deve ter no mínimo 3 caracteres"),
    codigo_fabricante: z
        .string()
        .trim()
        .min(3, "Código do fabricante deve ter no mínimo 3 caracteres"),
    codigo_categoria: z
        .string()
        .trim()
        .min(3, "Código da Categoria deve ter no mínimo 3 caracteres"),
    codigo_fornecedor: z
        .string()
        .trim()
        .min(3, "Código da Fornecedor deve ter no mínimo 3 caracteres"),
    codigo: z
        .string()
        .trim()
        .min(3, "Código do Produto deve ter no mínimo 3 caracteres"),
    preco_compra: z
        .string()
        .trim()
        .transform((valor) => valor.replace(",", "."))
        .refine((valor) => !isNaN(Number(valor)) && Number(valor) > 0, {
            message: "Preço deve ser um número válido maior que zero",
        })
        .transform((valor) => Number(valor)),
    unidade_medida: z
        .string()
        .trim()
        .min(2, "Unidade de medida tem que ter no mínimo 2 caracteres")
        .max(2, "Unidade de medidas tem que ter no maxímo 2 caracteres"),
    cor: z
        .string()
        .trim()
        .min(2, "Cor deve ter no mínimo de 2 caracteres"),
    material: z
        .string()
        .trim()
        .min(5, "Material deve ter no mínimo de 5 caracteres"),
    descricao: z
        .string()
        .trim()
        .min(10, "Descrição do produto deve ter no mínimo de 10 caracteres"),
});
export type ProdutoCriarSchema = z.infer<typeof produtoCriarSchema>;
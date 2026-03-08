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
            .min(3, "Categoria é obrigatoria"),
        codigo_fornecedor: z
            .string()
            .trim()
            .min(3, "Fornecedor é obrigatorio"),
        codigo: z
            .string()
            .trim()
            .min(3, "Código do Produto deve ter no mínimo 3 caracteres"),
        preco_compra: z
            .preprocess(
                (valor) => {
                    if (valor === null) return valor;
                    console.log(valor);
                    const str = String(valor).trim();
                    if (str.includes(",")) {
                        return parseFloat(str.replace(/\./g, "").replace(",", "."));
                    } else {
                        return parseFloat(str);
                    }
                },
                z.number()
                    .positive("Preço deve ser maior que zero")
            ),
        unidade_medida: z
            .string
            ()
            .trim()
            .min(2, "Unidade de medida tem que ter no mínimo 2 caracteres")
            .max(2, "Unidade de medidas tem que ter no maxímo 2 caracteres"),
        cor:
            z
                .string()
                .trim()
                .min(2, "Cor deve ter no mínimo de 2 caracteres"),
        material:
            z
                .string()
                .trim()
                .min(5, "Material deve ter no mínimo de 5 caracteres"),
        descricao:
            z
                .string()
                .trim()
                .min(10, "Descrição do produto deve ter no mínimo de 10 caracteres"),
    })
;


export type ProdutoInput = z.input<typeof produtoCriarSchema>
export type ProdutoOutput = z.output<typeof produtoCriarSchema>
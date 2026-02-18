import {z} from "zod";

export const fornecedorCriarSchema = z.object({
    razao_social: z
        .string()
        .trim()
        .min(4, "Razão Social deve ter no mínimo 4 caracteres"),

    nome_fantasia: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    cnpj: z
        .string()
        .trim()
        .regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 números"),

    inscricao: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    telefone: z
        .string()
        .trim()
        .regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 números"),

    email: z
        .email("E-mail inválido"),

    contato_principal: z
        .string()
        .trim()
        .min(3, "Contato principal é obrigatório"),

    whatsapp: z
        .string()
        .trim()
        .regex(/^\d{10,11}$/, "WhatsApp deve conter 10 ou 11 números")
        .optional()
        .or(z.literal("")),

    cep: z
        .string()
        .trim()
        .regex(/^\d{8}$/, "CEP deve conter exatamente 8 números"),

    cidade: z
        .string()
        .trim()
        .min(2, "Cidade é obrigatória"),

    bairro: z
        .string()
        .trim()
        .min(2, "Bairro é obrigatório"),

    estado: z
        .string()
        .trim()
        .length(2, "Estado deve ter 2 letras (UF)")
        .transform((v) => v.toUpperCase()),

    logradouro: z
        .string()
        .trim()
        .min(3, "Rua é obrigatória"),

    numero: z
        .string()
        .trim()
        .min(1, "Número é obrigatório"),

    complemento: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    prazo_pagamento: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    forma_pagamento: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    banco: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    chave_pix: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    observacoes: z
        .string()
        .trim()
        .min(5, "Observação deve ter no mínimo 5 caracteres")
        .optional()
        .or(z.literal("")),
});

export type FornecedorCriarFormData = z.infer<typeof fornecedorCriarSchema>;

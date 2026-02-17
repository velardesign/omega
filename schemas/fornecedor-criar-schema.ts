import {z} from "zod";

export const ForecedorCriarSchema = z.object({
    codigo: z.string().min(3, "Código é Obrigatório"),
    razao_social: z.string().min(4, "Razão Social é Obrigatória"),
    nome_fantasia: z.string().optional(),
    cnpj: z.string().length(14, "CNPJ deve ter 14 digitos"),
    insc: z.string().optional(),
    telefone: z.string().min(3, "Telefone é Obrigatório"),
    email: z.email("E-mail inválido"),
});
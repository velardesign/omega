import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  username: z.string().min(3, "Usuário é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  role: z.string().min(1, "Cargo é obrigatório"),

  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email("E-mail inválido"),

  profile: z.enum(["admin", "comercial", "financeiro", "operacional"]),
  status: z.enum(["ativo", "inativo"]),

  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),

  notes: z.string().optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  }
);

export type UserCreateFormData = z.infer<typeof userCreateSchema>;

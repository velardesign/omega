import {FornecedorRepository} from "@/src/repository/interfaces/fornecedor-repository";
import {FornecedorDTO} from "@/src/domain/types/fornecedor-types";
import {prisma} from "@/lib/prisma";

export class FornecedorPrismaRepository implements FornecedorRepository {

    async getFornecedores(): Promise<{ codigo: string | null, razao_social: string }[]> {
        return await prisma.fornecedor.findMany({
            select: {
                codigo: true,
                razao_social: true,
            },
            orderBy: {
                razao_social: 'asc'
            }
        });
    };

    async addFornecedor(fornecedor: FornecedorDTO): Promise<void> {
        await prisma.fornecedor.create({
            data: {
                razao_social: fornecedor.razao_social,
                nome_fantasia: fornecedor.nome_fantasia,
                observacoes: fornecedor.observacoes,
                contatos: {
                    create:
                        [
                            {
                                tipo: "TELEFONE",
                                valor: fornecedor.telefone,
                            },
                            {
                                tipo: "EMAIL",
                                valor: fornecedor.email,
                            },
                            {
                                tipo: "WHATSAPP",
                                valor: fornecedor.whatsapp || "",
                            },
                            {
                                tipo: "CONTATO_PRINCIPAL",
                                valor: fornecedor.contato_principal,
                            },
                        ].filter(c => c.valor)
                },
                endereco_fornecedor: {
                    create: {
                        logradouro: fornecedor.logradouro,
                        numero: fornecedor.numero,
                        bairro: fornecedor.bairro,
                        estado: fornecedor.estado,
                        cidade: fornecedor.cidade,
                        pais: fornecedor.pais || "BRASIL",
                        cep: fornecedor.cep,
                        complemento: fornecedor.complemento,
                    }
                },
                dados_comercial: {
                    create: {
                        prazo_pagamento: Number(fornecedor.prazo_pagamento),
                        forma_pagamento: fornecedor.forma_pagamento,
                        banco: fornecedor.banco,
                        chave_pix: fornecedor.chave_pix,
                    }
                }
            }
        });
    }

}
import {prisma} from "@/lib/prisma";
import {Caixa, Entrada, TipoEntrada, Prisma, Saida} from "@/generated/prisma/client";
import {DateTime} from "effect/DateTime";


interface EntradaDTO {
    tipo: TipoEntrada;
    responsavel: string;
    data_hora?: DateTime;
    valor: number;
}

interface SaidaDTO {
    tipo: string;
    responsavel: string;
    data_hora?: DateTime;
    valor: number;
}

interface Autorizacao {
    valor: string;
    responsavel: string;
}

type CaixaComAberturaFechamento = Prisma.CaixaGetPayload<{
    include: {
        abertura: true;
        fechamento: true;
    }
}>

async function verificaCaixaDoDia(): Promise<CaixaComAberturaFechamento | null> {
    const hoje = new Date();
    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
    return await prisma.caixa.findFirst({
        where: {
            abertura: {
                data_hora: {
                    gte: inicioDoDia,
                    lt: fimDoDia,
                }
            }
        },
        include: {
            abertura: true,
            fechamento: true,
        }

    });
}

async function criaCaixaDoDia(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null> {
    return await prisma.caixa.create({
        data: {
            abertura: {
                create: {
                    autorizacao: autorizacao.valor,
                    responsavel: autorizacao.responsavel,
                }

            },
        },
        include: {
            abertura: true,
            fechamento: true
        }
    });
}

export async function getCaixa(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null> {

    try {
        const caixa = await verificaCaixaDoDia();

        if (caixa) {
            return caixa;
        }

        return await criaCaixaDoDia(autorizacao);

    } catch
        (error) {
        console.error("Erro ao abrir caixa: ", error);
        return null;
    }

}

export async function addEntrada(entrada: EntradaDTO) {

    try {
        const caixaDoDia = await verificaCaixaDoDia();

        if (!caixaDoDia) {
            throw new Error("Caixa do Dia Não Encontrado!");
        }

        if (caixaDoDia?.fechamento) {
            throw new Error("Caixa do Dia Já Foi Fechado Converse com o Administrador do Sistema!");
        }

        await prisma.caixa.update({
            where: {
                id: caixaDoDia.id,
            },
            data: {
                entradas: {
                    create: {
                        tipo: entrada.tipo,
                        responsavel: entrada.responsavel,
                        data_hora: new Date(),
                        valor: entrada.valor,
                    }
                }
            }

        })
    } catch (error) {
        console.error("Erro ao adicionar entrada: ", error);
        throw error;
    }

}

export async function addSaida(saida: SaidaDTO) {

    try {
        const caixaDoDia = await verificaCaixaDoDia();

        if (!caixaDoDia) {
            throw new Error("Caixa do Dia Não Encontrado!");
        }

        if (caixaDoDia?.fechamento) {
            throw new Error("Caixa do Dia Já Foi Fechado Converse com o Administrador do Sistema!");
        }

        await prisma.caixa.update({
            where: {
                id: caixaDoDia.id,
            },
            data: {
                saidas: {
                    create: {
                        tipo: saida.tipo,
                        responsavel: saida.responsavel,
                        data_hora: new Date(),
                        valor: saida.valor,
                    }
                }
            }

        })
    } catch (error) {
        console.error("Erro ao adicionar saida: ", error);
        throw error;
    }

}

export async function listaTodasSaidasDoDia(data: Date): Promise<Saida[]> {
    const dataInicial = new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        0, 0, 0, 0
    );
    const proximaData = new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate() + 1,
        0, 0, 0, 0
    );
    try {
        const saidas = await prisma.saida.findMany({
            where: {
                data_hora: {
                    gte: dataInicial,
                    lt: proximaData,
                }
            }
        });
        return saidas;
    } catch (error) {
        console.error("Erro ao encontrar saidas: ", error);
        return [];
    }
}

export async function listaTodasEntradasDoDia(data: Date): Promise<Entrada[]> {
    const dataInicial = new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        0, 0, 0, 0
    )
    const proximaData = new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate() + 1,
        0, 0, 0, 0
    );
    try {
        const entradas = await prisma.entrada.findMany({
            where: {
                data_hora: {
                    gte: dataInicial,
                    lt: proximaData,
                }
            }
        });
        return entradas;
    } catch (error) {
        console.error("Erro ao encontrar entradas: ", error);
        return [];
    }
}

export async function listaTodasSaidas() {
    try {
        const saidas = await prisma.saida.findMany({
            orderBy: {
                data_hora: 'asc',
            }
        });
        return saidas;
    } catch (error) {
        console.error("Erro ao encontrar saidas: ", error);
        return [];
    }
}
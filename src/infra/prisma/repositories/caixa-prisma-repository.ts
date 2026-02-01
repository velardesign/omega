import "server-only";
import {CaixaRepository} from "@/src/repository/interfaces/caixa-repository";
import {Autorizacao, EntradaDTO, SaidaDTO} from "@/src/domain/types/caixa-types";
import {prisma} from "@/lib/prisma";
import {EntradaToDTO} from "@/src/infra/prisma/mappers/entrada-dto.mapper";
import {Prisma} from "@/generated/prisma/client";
import {SaidaToDTO} from "@/src/infra/prisma/mappers/saida-dto.mapper";

export type CaixaComAberturaFechamento = Prisma.CaixaGetPayload<{
    include: {
        abertura: true;
        fechamento: true;
    }
}>

export class CaixaPrismaRepository implements CaixaRepository {

    async addEntrada(entrada: EntradaDTO): Promise<void> {
        try {
            const caixaDoDia = await this.verificaCaixaDoDia();

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
                            valor: Prisma.Decimal(entrada.valor),
                        }
                    }
                }

            })
        } catch (error) {
            console.error("Erro ao adicionar entrada: ", error);
            throw error;
        }

    }

    async addSaida(saida: SaidaDTO): Promise<void> {
        try {
            const caixaDoDia = await this.verificaCaixaDoDia();

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

    async getCaixa(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null> {

        try {
            const caixa = await this.verificaCaixaDoDia();


            if (caixa) {
                return caixa;
            }

            return await this.criaCaixaDoDia(autorizacao);
        } catch
            (error) {
            console.error("Erro ao abrir caixa: ", error);
            return null;
        }
    }

    async listarEntradasDoDia(data: Date): Promise<EntradaDTO[]> {
        const intervalo = this.getIntervaloDoDia(data);
        try {
            const entradas = await prisma.entrada.findMany({
                where: {
                    data_hora: {
                        gte: intervalo.inicioDoDia,
                        lt: intervalo.fimDoDia,
                    }
                }
            });
            return entradas.map(EntradaToDTO);
        } catch (error) {
            console.error("Erro ao encontrar entradas: ", error);
            return [];
        }
    }

    async listarSaidasDoDia(data: Date): Promise<SaidaDTO[]> {

        const intervalo = this.getIntervaloDoDia(data)
        try {
            const saidas = await prisma.saida.findMany({
                where: {
                    data_hora: {
                        gte: intervalo.inicioDoDia,
                        lt: intervalo.fimDoDia,
                    }
                }
            });
            return saidas.map(SaidaToDTO);
        } catch (error) {
            console.error("Erro ao encontrar saidas: ", error);
            return [];
        }
    }

    async listarTodasEntradas(): Promise<EntradaDTO[]> {
        try {
            const entradas = await prisma.entrada.findMany({
                orderBy: {
                    data_hora: 'asc',
                }
            })

            return entradas.map(EntradaToDTO);

        } catch (error) {

            console.error("Error ao encontrar entradas: ", error);
            return [];
        }
    }

    async listarTodasSaidas(): Promise<SaidaDTO[]> {
        try {
            const saidas = await prisma.saida.findMany({
                orderBy: {
                    data_hora: 'asc',
                }
            });
            return saidas.map(SaidaToDTO);
        } catch (error) {
            console.error("Erro ao encontrar saidas: ", error);
            return [];
        }
    }

    async fecharCaixa(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null> {
        try {
            const caixaDoDia = await this.verificaCaixaDoDia();

            if (!caixaDoDia) {
                throw new Error("Caixa do dia não encontrado!");
            }

            if (caixaDoDia.fechamento) {
                throw new Error("Caixa já foi fechado!");
            }

            const caixaFechado = await prisma.caixa.update({
                where: {
                    id: caixaDoDia.id,
                    fechamento: null,
                },
                data: {
                    fechamento: {
                        create: {
                            responsavel: autorizacao.responsavel,
                            autorizacao: autorizacao.valor,
                            data_hora: new Date(),
                        }
                    }
                },
                include: {
                    abertura: true,
                    fechamento: true,
                }
            })

            return caixaFechado;

        } catch (error) {
            console.error("Erro ao fechar o caixa: ", error)
            return null;
        }
    }

    private async criaCaixaDoDia(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null> {
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

    private async verificaCaixaDoDia(): Promise<CaixaComAberturaFechamento | null> {
        const hoje = new Date();
        const intervalo = this.getIntervaloDoDia(hoje);
        return await prisma.caixa.findFirst({
            where: {
                abertura: {
                    data_hora: {
                        gte: intervalo.inicioDoDia,
                        lt: intervalo.fimDoDia,
                    }
                }
            },
            include: {
                abertura: true,
                fechamento: true,
            }

        });
    }

    private getIntervaloDoDia(dia: Date): { inicioDoDia: Date, fimDoDia: Date } {
        const inicioDoDia = new Date(
            dia.getFullYear(),
            dia.getMonth(),
            dia.getDate(),
            0, 0, 0, 0
        );
        const fimDoDia = new Date(
            dia.getFullYear(),
            dia.getMonth(),
            dia.getDate() + 1,
            0, 0, 0, 0
        );
        return {
            inicioDoDia,
            fimDoDia
        }
    }

}
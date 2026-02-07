import {VendaRepository} from "@/src/repository/interfaces/venda-repository";
import {VendaDTO} from "@/src/domain/types/venda-types";
import {prisma} from "@/lib/prisma";

export class VendaPrismaRepositor implements VendaRepository {


    async addVenda(venda: VendaDTO): Promise<void> {

        await prisma.venda.create({
            data: {
                responsavel: venda.responsavel,
                data_hora: venda.data_hora,

                cliente: {
                    connect: {
                        cod: venda.cliente.codigo,
                    },
                },

                pagamento: {
                    create: {},
                },

                itensVenda: {
                    create: venda.produtos.map(produto => (
                        {
                            quantidade: produto.quantidade,
                            preco_venda: produto.preco,
                            produto: {
                                connect: {
                                    codigo: produto.codigo
                                }
                            }
                        }
                    ))
                }
            },

        });
    }
}
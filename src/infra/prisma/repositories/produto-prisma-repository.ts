import {ProdutoRepository} from "@/src/repository/interfaces/produto-repository";
import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {prisma} from "@/lib/prisma";

export class ProdutoPrismaRepository implements ProdutoRepository {
    async update(produto: ProdutoDTO): Promise<void> {
        await prisma.produto.update({
            where: {
                codigo: produto.codigo,
            },
            data: {
                codigo_fabricante: produto.codigo_fabricante,
                nome: produto.nome,
                unidade_medida: produto.unidade_medida,
                preco_compra: produto.preco_compra,
                cor: produto.cor,
                material: produto.material,
                descricao: produto.descricao,
                categoria: {
                    connect: {
                        codigo: produto.codigo_categoria,
                    }
                },
                fornecedor:{
                    connect:{
                        codigo:produto.codigo_fornecedor,
                    }
                }
            }
        })
    }

    async todosProdutos(): Promise<ProdutoDTO[]> {
        const produtos = await prisma.produto.findMany({
            include: {
                categoria: {
                    select: {
                        codigo: true,
                    }
                },
                fornecedor: {
                    select: {
                        codigo: true,
                    }
                }
            },
            orderBy:{
                codigo: 'asc'
            },

        });
        return produtos.map(
            produto => ({
                ...produto,
                codigo_categoria: produto.categoria.codigo,
                codigo_fornecedor: produto.fornecedor.codigo,
                preco_compra: Number(produto.preco_compra)
            })
        )
    }

    async addProduto(produto: ProdutoDTO): Promise<void> {
        await prisma.produto.create({
            data: {
                nome: produto.nome,
                codigo: produto.codigo,
                descricao: produto.descricao,
                preco_compra: produto.preco_compra,
                cor: produto.cor,
                material: produto.material,
                unidade_medida: produto.unidade_medida,
                codigo_fabricante: produto.codigo_fabricante,
                categoria: {
                    connect: {codigo: produto.codigo_categoria}
                },
                fornecedor: {
                    connect: {codigo: produto.codigo_fornecedor}
                },

            }
        })
    }

}
import {ProdutoRepository} from "@/src/repository/interfaces/produto-repository";
import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {prisma} from "@/lib/prisma";

export class ProdutoPrismaRepository implements ProdutoRepository {

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
            }
        });
        return produtos.map(
            produto => ({
                ...produto,
                codigo_categoria:produto.categoria.codigo,
                codigo_fornecedor:produto.fornecedor.codigo,
                preco_compra:Number(produto.preco_compra)
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
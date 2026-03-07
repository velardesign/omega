import {SequenciaRepository} from "@/src/repository/interfaces/sequencia-repository";
import {SequenciaPrismaRepository} from "@/src/infra/prisma/repositories/sequencia-prisma-repository";
import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {ProdutoRepository} from "@/src/repository/interfaces/produto-repository";
import {ProdutoPrismaRepository} from "@/src/infra/prisma/repositories/produto-prisma-repository";


export class ProdutoServices{
    private static instance: ProdutoServices;
    private repository: ProdutoRepository;
    private gerador : SequenciaRepository;

    private constructor() {
        this.repository = new ProdutoPrismaRepository();
        this.gerador = new SequenciaPrismaRepository();
    }

    static getInstance(){
        if (!ProdutoServices.instance){
            this.instance = new ProdutoServices();
        }
        return this.instance;
    }

    async addProduto(produto:ProdutoDTO){
        produto.codigo = await this.gerador.geraCodigo("PRODUTO");
        await this.repository.addProduto(produto);
    }

    async todosProdutos() {
        return await this.repository.todosProdutos();
    }

    async updateProduto(produto: ProdutoDTO) {
        await this.repository.update(produto);
    }
}
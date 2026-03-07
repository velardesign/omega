import {ProdutoDTO} from "@/src/domain/types/produto-types";

export interface ProdutoRepository {
    addProduto(produto: ProdutoDTO): Promise<void>;
    todosProdutos(): Promise<ProdutoDTO[]>;
}
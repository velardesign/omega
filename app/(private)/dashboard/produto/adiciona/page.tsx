import AdicionaProduto, {PropsProduto} from "@/components/produto/adiciona-produto";
import {listarTodasCategorias} from "@/actions/categoria-action";
import {listarTodosFornecedores} from "@/actions/fornecedor-action";
import {listarTodosProdutos} from "@/actions/produto-action";
import EditaProduto from "@/components/produto/editar-produto";
import {ProdutoDTO} from "@/src/domain/types/produto-types";

async function carregaCategoria(): Promise<PropsProduto> {

    const categorias = await listarTodasCategorias();
    const fornecedores = await listarTodosFornecedores();

    return {categorias, fornecedores}
}

async function carregaProdutos(): Promise<ProdutoDTO[]> {
    return await listarTodosProdutos();
}

export default async function Page() {

    const {categorias, fornecedores} = await carregaCategoria();
    const produtos = await carregaProdutos();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <AdicionaProduto categorias={categorias} fornecedores={fornecedores}/>
            <EditaProduto produtos={produtos}/>
        </div>
    );
}
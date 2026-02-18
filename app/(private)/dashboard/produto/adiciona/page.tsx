import AdicionaProduto, {PropsProduto} from "@/components/produto/adiciona-produto";
import {listarTodasCategorias} from "@/actions/categoria-action";
import {listarTodosFornecedores} from "@/actions/fornecedor-action";

async function carregaCategoria(): Promise<PropsProduto> {

    const categorias = await listarTodasCategorias();
    const fornecedores = await listarTodosFornecedores();

    return {categorias, fornecedores}
}

export default async function Page() {

    const {categorias, fornecedores} = await carregaCategoria();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AdicionaProduto categorias={categorias} fornecedores={fornecedores}/>
        </div>
    );
}
import AdicionaProduto, {PropsProduto} from "@/components/produto/adiciona-produto";

async function carregaCategoria(): Promise<PropsProduto> {

    const categorias = [
        {
            nome: "Ferragens",
            value: "ferragens"
        },
        {
            nome: "Perfis",
            value: "perfis"
        }
    ]
    const fornecedores = [
        {
            nome: "Divibras",
            codigo: "001"
        },
        {
            nome: "ABC",
            codigo: "002"
        }
    ]

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
import AdicionaCategoria from "@/components/categoria/adiciona-categoria";
import EditaCategoria from "@/components/categoria/edita-categoria";

async function carregaCategorias(){
    return [
        {
            codigo: "001",
            nome: "Aluminio"
        },
        {
            codigo:"002",
            nome:"Ferragens"
        }
    ]
}

export default async function Page() {
    const categorias = await carregaCategorias();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <AdicionaCategoria/>
            <EditaCategoria categorias={categorias}/>
        </div>
    );
}
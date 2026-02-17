import AdicionaCategoria from "@/components/categoria/adiciona-categoria";
import EditaCategoria from "@/components/categoria/edita-categoria";
import {listarTodasCategorias} from "@/actions/categoria-action";

export default async function Page() {
    const categorias = await listarTodasCategorias();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <AdicionaCategoria/>
            <EditaCategoria categorias={categorias}/>
        </div>
    );
}
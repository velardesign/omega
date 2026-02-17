"use server"

import {CategoriaServices} from "@/src/application/services/categoria-services";
import {revalidatePath} from "next/cache";

const service = CategoriaServices.getInstance();

export async function addCategoria(formData:FormData) {
    const nome = formData.get("nome") as string
    const codigo = formData.get("codigo") as string
    await service.addCategoria({nome,codigo});
    revalidatePath("/dashboard/categoria/adicionar")
}

export async function listarTodasCategorias(){
    return service.listarTodasCategorias();
}

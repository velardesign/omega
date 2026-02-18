"use server"
import {fornecedorCriarSchema} from "@/schemas/fornecedor-criar-schema";
import {FornecedorServices} from "@/src/application/services/fornecedor-services";

const services = FornecedorServices.getInstance();

export async function addFornecedor(formData: unknown) {
    const data = fornecedorCriarSchema.parse(formData);
    await services.addFornecedor(data);

}
export async function listarTodosFornecedores(){
    return await services.listaFornecedores();
}
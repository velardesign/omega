import {FornecedorRepository} from "@/src/repository/interfaces/fornecedor-repository";
import {FornecedorPrismaRepository} from "@/src/infra/prisma/repositories/fornecedor-prisma-repository";
import {FornecedorDTO} from "@/src/domain/types/fornecedor-types";

export class FornecedorServices {
    private static instance: FornecedorServices;
    private repository: FornecedorRepository;

    private constructor() {
        this.repository = new FornecedorPrismaRepository();
    }


    static getInstance(){
        if(!FornecedorServices.instance){
            this.instance = new FornecedorServices();
        }
        return this.instance;
    }

    async addFornecedor(fornecedor:FornecedorDTO){
        await this.repository.addFornecedor(fornecedor);
    }

    async listaFornecedores() {
        return await this.repository.getFornecedores();
    }
}
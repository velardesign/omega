import {FornecedorRepository} from "@/src/repository/interfaces/fornecedor-repository";
import {FornecedorPrismaRepository} from "@/src/infra/prisma/repositories/fornecedor-prisma-repository";
import {FornecedorDTO} from "@/src/domain/types/fornecedor-types";
import {SequenciaPrismaRepository} from "@/src/infra/prisma/repositories/sequencia-prisma-repository";
import {SequenciaRepository} from "@/src/repository/interfaces/sequencia-repository";

export class FornecedorServices {
    private static instance: FornecedorServices;
    private repository: FornecedorRepository;
    private gerador: SequenciaRepository;

    private constructor() {
        this.repository = new FornecedorPrismaRepository();
        this.gerador = new SequenciaPrismaRepository();
    }


    static getInstance() {
        if (!FornecedorServices.instance) {
            this.instance = new FornecedorServices();
        }
        return this.instance;
    }

    async addFornecedor(fornecedor: FornecedorDTO) {
        fornecedor.codigo = await this.gerador.geraCodigo("FORNECEDOR");
        await this.repository.addFornecedor(fornecedor);
    }

    async listaFornecedores() {
        return await this.repository.getFornecedores();
    }
}
import {CategoriaRepository} from "@/src/repository/interfaces/categoria-repository";
import {CategoriaPrismaRepository} from "@/src/infra/prisma/repositories/categoria-prisma-repository";
import {CategoriaDTO} from "@/src/domain/types/categoria-types";
import {SequenciaRepository} from "@/src/repository/interfaces/sequencia-repository";
import {SequenciaPrismaRepository} from "@/src/infra/prisma/repositories/sequencia-prisma-repository";

export class CategoriaServices {
    private repository: CategoriaRepository;
    private static instance: CategoriaServices;
    private sequencia: SequenciaRepository;

    private constructor() {
        this.repository = new CategoriaPrismaRepository();
        this.sequencia = new SequenciaPrismaRepository();
    }

    static getInstance() {
        if (!CategoriaServices.instance) {
            CategoriaServices.instance = new CategoriaServices();
        }
        return CategoriaServices.instance;
    }

    async listarTodasCategorias() {
        return await this.repository.getCategorias();
    }

    async addCategoria(nome: string) {
        const codigo = await this.sequencia.geraCodigo("CATEGORIA");
        return this.repository.addCategoria({nome,codigo});
    }
}
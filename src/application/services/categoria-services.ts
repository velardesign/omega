import {CategoriaRepository} from "@/src/repository/interfaces/categoria-repository";
import {CategoriaPrismaRepository} from "@/src/infra/prisma/repositories/categoria-prisma-repository";
import {CategoriaDTO} from "@/src/domain/types/categoria-types";

export class CategoriaServices {
    private repository: CategoriaRepository;
    private static instance: CategoriaServices;

    private constructor() {
        this.repository = new CategoriaPrismaRepository();
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
    async addCategoria (categoria:CategoriaDTO){
        return this.repository.addCategoria(categoria);
    }
}
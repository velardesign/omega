import {CategoriaDTO} from "@/src/domain/types/categoria-types";

export interface CategoriaRepository {
    getCategorias(): Promise<CategoriaDTO[]>;

    addCategoria(categoria: CategoriaDTO): void;

}
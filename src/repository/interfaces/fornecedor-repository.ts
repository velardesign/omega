import {FornecedorDTO} from "@/src/domain/types/fornecedor-types";

export interface FornecedorRepository {
    addFornecedor(fornecedor: FornecedorDTO): Promise<void>;

    getFornecedores(): Promise<{ codigo: string | null, razao_social: string }[]>;
}
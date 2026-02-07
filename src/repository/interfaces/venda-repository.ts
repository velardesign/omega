import {VendaDTO} from "@/src/domain/types/venda-types";

export interface VendaRepository{
    addVenda(venda:VendaDTO):Promise<void>;
}
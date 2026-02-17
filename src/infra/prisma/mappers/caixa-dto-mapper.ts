import {CaixaDTO} from "@/src/domain/types/caixa-types";


export function caixaToDTO(caixa:CaixaDTO):CaixaDTO{
    return {
        id: caixa?.id,
        abertura: {
            id: caixa?.abertura?.id,
            responsavel: caixa?.abertura?.responsavel,
            autorizacao: caixa?.abertura?.autorizacao,
            caixa_id: caixa?.abertura?.caixa_id,
        },
        fechamento: {
            id: caixa?.fechamento?.id,
            responsavel: caixa?.fechamento?.responsavel,
            autorizacao: caixa?.fechamento?.autorizacao,
            caixa_id: caixa?.fechamento?.caixa_id,
        }
    }
}
import {Saida, SaidaDTO} from "@/src/domain/types/caixa-types";


export function SaidaToDTO(saida: Saida): SaidaDTO {
    return {
        id: saida?.id,
        tipo: saida.tipo,
        data_hora: saida.data_hora,
        responsavel: saida.responsavel,
        valor: Number(saida.valor),
        caixa_id: saida.caixa_id,
    }
}

export function SaidaFromDTO(dto: SaidaDTO): Saida {
    return {
        id: dto?.id,
        tipo: dto.tipo,
        data_hora: dto.data_hora,
        responsavel: dto.responsavel,
        valor: dto.valor,
        caixa_id: dto?.caixa_id,
    }
}
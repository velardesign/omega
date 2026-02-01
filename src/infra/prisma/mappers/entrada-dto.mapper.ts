import {Entrada, EntradaDTO} from "@/src/domain/types/caixa-types";

export function EntradaToDTO(entrada: Entrada): EntradaDTO {
    const dto = {
        tipo: entrada.tipo,
        responsavel: entrada.responsavel,
        data_hora: entrada?.data_hora,
        valor: Number(entrada.valor),
    }
    return dto;
}

export function EntradaFromDTO(dto: EntradaDTO): Entrada {
    const entrada = {
        tipo: dto.tipo,
        responsavel: dto.responsavel,
        data_hora: dto.data_hora,
        valor: Number(dto.valor)
    }
    return entrada;
}
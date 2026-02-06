
import {TipoEntrada} from "@/generated/prisma/enums";
import {Decimal} from "@prisma/client-runtime-utils";

export interface ValoresCaixa {
    total: number;
    totalEntradas: number;
    totalSaidas: number;
}

export interface Entrada {
    id?: string;
    tipo: TipoEntrada;
    data_hora?: Date;
    responsavel: string;
    valor: number | Decimal;
    caixa_id?: string;
}

export interface Saida {
    id?: string;
    tipo: string;
    data_hora?: Date;
    responsavel: string;
    valor: number | Decimal;
    caixa_id?: string;
}


export interface SaidaDTO {
    id?: string;
    tipo: string;
    responsavel: string;
    data_hora?: Date;
    valor: number;
    caixa_id?: string;
}

export interface EntradaDTO {
    tipo: TipoEntrada;
    responsavel: string;
    data_hora?: Date;
    valor: number;
}

export interface Autorizacao {
    valor: string;
    responsavel: string;
}

export interface ResumoCaixa {
    valoresCaixaAtual: ValoresCaixa;
    saldoAcumulado: number;
    entradasAcumuladas: number;
    saidasAcumuladas: number;
}

export interface AberturaDTO {
    id?: string
    data_hora?: Date
    responsavel?: string
    autorizacao?: string
    caixa_id?: string
}

export interface FechamentoDTO {
    id?: string
    data_hora?: Date
    responsavel?: string
    autorizacao?: string
    caixa_id?: string
}

export interface CaixaDTO {
    id?: string;
    abertura?: AberturaDTO | null;
    fechamento?: FechamentoDTO | null;
}


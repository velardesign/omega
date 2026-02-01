import {TipoEntrada} from "@/generated/prisma/enums";

export interface TableCashData {
    tipo: string | TipoEntrada,
    responsavel: string,
    data_hora?: Date,
    valor: number,
}

export interface TableStage {
    label: string;
    data: TableCashData[];
}
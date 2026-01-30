export interface TableCashData {
    tipo: string,
    responsavel: string,
    data_hora: Date,
    valor: number,
}

export interface TableStage {
    label: string;
    data: TableCashData[];
}
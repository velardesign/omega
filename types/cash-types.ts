export interface TableCashData{
    cod:string;
    price:number;
    date:Date;
}

export interface TableStage{
    label:string;
    data: TableCashData[];
}
import { EntradaDTO } from "./caixa-types";

export interface VendaDTO{
    cliente:ClienteDTO;
    produtos:ProdutoDTO[];
    pagamento:PagamentoDTO;
    responsavel:string;
    data_hora:Date;
}

export interface ClienteDTO{
    codigo:string;
    nome:string;
}

export interface ProdutoDTO{
    quantidade:number
    codigo:string;
    nome:string;
    preco:number;
}

export interface PagamentoDTO{
    codigo:string;
    entradas?:EntradaDTO[];
}
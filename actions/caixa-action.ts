"use server"

import {abrirCaixa, fecharCaixa, getSaidasTodosCaixas, getValoresCaixaDia} from "@/services/caixa-services";
import {listaTodasSaidasDoDia} from "@/repository/caixa-repository";

interface Autorizacao{
    valor:string,
    responsavel:string,
}

export async function abrirCaixaAction(autorizacao:Autorizacao){
    return abrirCaixa(autorizacao)
}

export async function fecharCaixaAction(autorizacao:Autorizacao){
    return fecharCaixa();
}

export async function carregarResumoCaixa(){
    const valoresTodosCaixas=10000.00;
    const valoresCaixa = await getValoresCaixaDia({valor:"adm",responsavel:"sistema"});
    return {valoresCaixa, valoresTodosCaixas};
}

export async function todasSaidaDoDia(){
    const dataHoje = new Date();
    dataHoje.setHours(0,0,0,0);
    return listaTodasSaidasDoDia(dataHoje);
}

export async function todasSaidas(){
    return await getSaidasTodosCaixas();
}
"use server"

import {
    abrirCaixa,
    fecharCaixa,
    getSaidasTodosCaixas,
    getValoresCaixaDia,
    getEntradasTodosCaixas, getSaidasDoDia, getEntradasDoDia
} from "@/services/caixa-services";
import {listaTodasEntradasDoDia, listaTodasSaidasDoDia} from "@/repository/caixa-repository";

interface Autorizacao {
    valor: string,
    responsavel: string,
}

interface SaidaDTO {
    tipo: string,
    responsavel: string,
    data_hora: Date,
    valor: number,
}

interface EntradaDTO {
    tipo: string | TipoEntrada;
    responsavel: string;
    data_hora: Date;
    valor: number;
}

export async function abrirCaixaAction(autorizacao: Autorizacao) {
    return abrirCaixa(autorizacao)
}

export async function fecharCaixaAction(autorizacao: Autorizacao) {
    return fecharCaixa();
}

function somarValore(lista: { valor: number }[]) {
    return lista.reduce((soma, item) => soma + item.valor, 0)
}

export async function carregarResumoCaixa() {
    const [listaSaidas, listaEntradas, valoresCaixaAtual] = await Promise.all([
        todasSaidas(),
        todasEntradas(),
        getValoresCaixaDia({valor: "ADM", responsavel: "Sistema"})
    ]);


    const saidasAcumuladas = somarValore(listaSaidas);
    const entradasAcumuladas = somarValore(listaEntradas);

    const saldoAcumulado = entradasAcumuladas - saidasAcumuladas;

    return {
        valoresCaixaAtual,
        saldoAcumulado,
        entradasAcumuladas,
        saidasAcumuladas,
    };
}

export async function todasSaidaDoDia() {
return getSaidasDoDia();
}

export async function todasEntradasDoDia() {
return getEntradasDoDia();
}

export async function todasSaidas() {
    return await getSaidasTodosCaixas();
}

export async function todasEntradas() {
    return await getEntradasTodosCaixas();
}
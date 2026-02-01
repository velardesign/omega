"use server"
import {Autorizacao} from "@/src/domain/types/caixa-types";
import {CaixaService} from "@/src/application/services/caixa-services";

const service = CaixaService.getInstance();

function somarValore(lista: { valor: number }[]) {
    return lista.reduce((soma, item) => soma + item.valor, 0)
}

export async function abrirCaixaAction(autorizacao: Autorizacao) {
    return service.abrirCaixa(autorizacao)
}

export async function fecharCaixaAction(autorizacao: Autorizacao) {
    return service.fecharCaixa(autorizacao);
}

export async function carregarResumoCaixa() {
    const [listaSaidas, listaEntradas, valoresCaixaAtual] = await Promise.all([
        todasSaidas(),
        todasEntradas(),
        service.getValoresCaixaDia({valor: "ADM", responsavel: "Sistema"})
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
return service.getSaidasDoDia();
}

export async function todasEntradasDoDia() {
return service.getEntradasDoDia();
}

export async function todasSaidas() {
    return await service.getSaidasTodosCaixas();
}

export async function todasEntradas() {
    return await service.getEntradasTodosCaixas();
}
import {
    getCaixa,
    listaTodasEntradasDoDia,
    listaTodasSaidas,
    listaTodasSaidasDoDia,
    listaTodasEntradas
} from "@/repository/caixa-repository";
import {Prisma} from "@/generated/prisma/client";


interface Autorizacao {
    valor: string;
    responsavel: string;
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

export async function getValoresCaixaDia(autorizacao: Autorizacao): Promise<ValoresCaixa> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const entradasHoje = await listaTodasEntradasDoDia(hoje);
    const saidasHoje = await listaTodasSaidasDoDia(hoje);

    const totalEntradas = entradasHoje.reduce(
        (soma, entrada) => soma.plus(entrada.valor), new Prisma.Decimal(0)
    );

    const totalSaidas = saidasHoje.reduce(
        (soma, saida) => soma.plus(saida.valor.abs()), new Prisma.Decimal(0)
    );

    const total = totalEntradas.minus(totalSaidas);

    return {
        total: Number(total) ?? 0.00,
        totalEntradas: Number(totalEntradas) ?? 0.00,
        totalSaidas: Number(totalSaidas) ?? 0.00,
    }
}

export function getValoresTodosCaixa(): number {
    return 100000.00;
}

export function adicionaEntrada(entrada: Entrada) {

}

export async function abrirCaixa(autorizacao: Autorizacao) {
    await getCaixa(autorizacao);
}

export function fecharCaixa() {
    console.log("Caixa Fechado!");
}

export async function getSaidasTodosCaixas(): Promise<SaidaDTO[]> {
    try {
        const listaSaidas = await listaTodasSaidas();

        const listaSaidasDTO = listaSaidas.map(
            (saida) => ({
                tipo: saida.tipo,
                responsavel: saida.responsavel,
                data_hora: saida.data_hora,
                valor: saida.valor.toNumber()
            })
        );
        return listaSaidasDTO;
    } catch (error) {
        return [];
    }
}

export async function getEntradasTodosCaixas(): Promise<EntradaDTO[]> {
    try {
        const listaEntradas = await listaTodasEntradas();

        const listaEntradasDTO = listaEntradas.map(
            (entrada) => ({
                tipo: entrada.tipo,
                responsavel: entrada.responsavel,
                data_hora: entrada.data_hora,
                valor: entrada.valor.toNumber()
            })
        );
        return listaEntradasDTO;
    } catch (error) {
        return [];
    }
}

export async function getEntradasDoDia() {
    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);
    return listaTodasEntradasDoDia(dataHoje);
}

export async function getSaidasDoDia() {
    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);
    return listaTodasSaidasDoDia(dataHoje);
}
import {
    getCaixa,
    listaTodasEntradasDoDia,
    listaTodasSaidas,
    listaTodasSaidasDoDia
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
            }));
        return listaSaidasDTO;
    } catch (error) {
        return [];
    }
}
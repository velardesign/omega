import {describe, it, expect, beforeEach} from "vitest";
import {prisma} from "@/lib/prisma";
import {
    getCaixa,
    addEntrada,
    addSaida,
    listaTodasSaidasDoDia,
    listaTodasEntradasDoDia
} from "@/repository/caixa-repository";
import {TipoEntrada} from "@/generated/prisma/enums";
import {getValoresCaixaDia} from "@/services/caixa-services";

if (process.env.NODE_ENV === "production") {
    throw new Error("Testes não podem rodar em produção!");
}

async function limparBanco() {
    await prisma.entrada.deleteMany();
    await prisma.saida.deleteMany();
    await prisma.caixa.deleteMany();
}

async function criarEntradas() {
    const entradas = [
        {
            tipo: TipoEntrada.PIX,
            responsavel: "Anderson Andrade",
            valor: 1050.0,
        },
        {
            tipo: TipoEntrada.DINHEIRO,
            responsavel: "Anderson Andrade",
            valor: 10.0,
        },
        {
            tipo: TipoEntrada.CARTAO,
            responsavel: "Anderson Andrade",
            valor: 3000.0,
        },
        {
            tipo: TipoEntrada.TRANSFERENCIA,
            responsavel: "Anderson Andrade",
            valor: 150.0,
        },
    ]

    for (const entrada of entradas) {
        await addEntrada(entrada);
    }
    return entradas;
}

async function criarSaidas() {
    const saidas = [
        {
            tipo: "Pagamento Fornecedor",
            responsavel: "Anderson Andrade",
            valor: 50.0,
        },
        {
            tipo: "Pagamento Funcionario",
            responsavel: "Anderson Andrade",
            valor: 110.0,
        },
        {
            tipo: "Pagamento Conta de Consumo",
            responsavel: "Anderson Andrade",
            valor: 300.0,
        },
        {
            tipo: "Pagamento uber",
            responsavel: "Anderson Andrade",
            valor: 150.0,
        },
    ]

    for (const saida of saidas) {
        await addSaida(saida);
    }
    return saidas;
}

const autorizacao = {
    responsavel: "Teste",
    valor: "Autorizado para teste",
}

describe("Caixa", () => {
    beforeEach(async () => {
        await limparBanco()
    });

    it("deve criar o caixa do dia", async () => {

        const caixa = await getCaixa(autorizacao);

        expect(caixa).toBeDefined();
        expect(caixa?.id).toBeTruthy();
    });

    it("deve adicionar uma entrada ao caixa", async () => {

        await getCaixa(autorizacao);

        await addEntrada({
            tipo: TipoEntrada.PIX,
            responsavel: "Teste",
            valor: 100,
        });

        const entradas = await prisma.entrada.findMany();

        expect(entradas.length).toBe(1);
        expect(entradas[0].tipo).toBe(TipoEntrada.PIX);
        expect(Number(entradas[0].valor)).toBe(100);
    });

    it("deve adicionar uma saida ao caixa", async () => {

        await getCaixa(autorizacao);

        await addSaida({
            tipo: "Conta de Consumo",
            responsavel: "Anderson Andrade",
            valor: 1000.0,
        });

        const saidas = await prisma.saida.findMany();

        expect(saidas.length).toBe(1);
        expect(saidas[0].tipo).toBe("Conta de Consumo");
        expect(Number(saidas[0].valor)).toBe(1000.0);
    })

    it("deve mostrar todas as saidas da data enviada", async () => {
        await limparBanco();

        const autorizacao = {
            responsavel: "Anderson",
            valor: "Autorizado por Senha",
        }

        await getCaixa(autorizacao);

        const saidas = await criarSaidas();

        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);

        const saidasBuscadas = await listaTodasSaidasDoDia(dataHoje);

        expect(saidasBuscadas).toBeDefined();
        expect(saidasBuscadas).toHaveLength(saidas.length);
        expect(saidasBuscadas.map(s => s.tipo)).toEqual(
            expect.arrayContaining(saidas.map(s => s.tipo))
        );

    });

    it("deve mostrar todas as entradas da data enviada", async () => {
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);

        await limparBanco();

        await getCaixa(autorizacao);

        const entradas = await criarEntradas();

        const entradasBuscadas = await listaTodasEntradasDoDia(dataHoje);

        expect(entradasBuscadas).toBeDefined();
        expect(entradasBuscadas).toHaveLength(entradas.length);
        expect(entradasBuscadas.map(e => e.tipo)).toEqual(
            expect.arrayContaining(entradasBuscadas.map(e => e.tipo))
        );

    });

    it("deve mostrar a soma de todas as saida e entradas do dia e um total do caixa", async () => {
        await limparBanco();

        await getCaixa(autorizacao);

        const entradas = await criarEntradas();
        const saidas = await criarSaidas();

        const somaEntradas = entradas.reduce((soma, entrada) => {
            return soma + entrada.valor;
        }, Number(0));
        const somaSaidas = saidas.reduce((soma, saida) => {
            return soma + saida.valor;
        }, Number(0));
        const entradasMenosSaidas = somaEntradas - somaSaidas;

        const caixaDoDia = await getValoresCaixaDia(autorizacao);

        expect(caixaDoDia.totalSaidas).toEqual(somaSaidas);
        expect(caixaDoDia.totalEntradas).toEqual(somaEntradas);
        expect(caixaDoDia.total).toEqual(entradasMenosSaidas);

    });

    it("valor do caixa sem entrada nem saida deve devolver total = 0.00 tota saida = 0.00 e total entradas = 0.00",
        async () => {
            await limparBanco();
            await getCaixa(autorizacao);

            const valoresCaixa = await getValoresCaixaDia(autorizacao);

            expect(valoresCaixa.total).toEqual(0.00);
            expect(valoresCaixa.totalEntradas).toEqual(0.00);
            expect(valoresCaixa.totalSaidas).toEqual(0.00);
        });
});
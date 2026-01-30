import {describe, it, expect, beforeEach} from "vitest";
import {prisma} from "@/lib/prisma";
import {getCaixa, addEntrada, addSaida} from "@/repository/caixa-repository";
import {TipoEntrada} from "@/generated/prisma/enums";

if(process.env.NODE_ENV === "production"){
    throw new Error("Testes não podem rodar em produção!");
}

describe("Caixa", () => {
    beforeEach(async () => {
        await prisma.entrada.deleteMany();
        await prisma.saida.deleteMany();
        await prisma.caixa.deleteMany();
    });

    it("deve criar o caixa do dia", async () => {
        const autorizacao = {
            responsavel: "Teste",
            valor: "Autorizado para teste",
        };

        const caixa = await getCaixa(autorizacao);

        expect(caixa).toBeDefined();
        expect(caixa?.id).toBeTruthy();
    });

    it("deve adicionar uma entrada ao caixa", async () => {
        const autorizacao = {
            responsavel: "Teste",
            valor: "Autorizado",
        };

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

    it("deve adicionar uma saida ao caixa",async () =>{
        const autorizacao = {
            responsavel:"Anderson",
            valor: "Autorizado",
        };

        await getCaixa(autorizacao);

        await addSaida({
            tipo:"Conta de Consulmo",
            responsavel:"Anderson Andrade",
            valor: 1000.0,
        });

        const saidas = await prisma.saida.findMany();

        expect(saidas.length).toBe(1);
        expect(saidas[0].tipo).toBe("Conta de Consulmo");
        expect(Number(saidas[0].valor)).toBe(1000.0);
    })
});
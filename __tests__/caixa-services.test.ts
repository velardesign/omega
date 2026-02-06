import {beforeEach, describe, vi, it, expect, afterEach} from "vitest";
import {EntradaDTO} from "@/src/domain/types/caixa-types";
import {TipoEntrada} from "@/generated/prisma/enums";
import {CaixaService} from "@/src/application/services/caixa-services";
import {CaixaPrismaRepository} from "@/src/infra/prisma/repositories/caixa-prisma-repository";

describe("Testes Caixa Services", () => {
    let addEntradaMock: any;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mockar o método addEntrada do repositório
        addEntradaMock = vi.spyOn(CaixaPrismaRepository.prototype, 'addEntrada')
            .mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("deve chamar o repo corretamente", async () => {
        const service = CaixaService.getInstance();
        const entrada: EntradaDTO = {
            tipo: TipoEntrada.PIX,
            responsavel: "Anderson",
            valor: 100,
        };

        await service.adicionaEntrada(entrada);

        expect(addEntradaMock).toHaveBeenCalledTimes(1);
        expect(addEntradaMock).toHaveBeenCalledWith(entrada);
    });
    it("deve tratar erro ao adicionar entrada", async () => {
        const erro = new Error("Caixa do Dia Não Encontrado!");

        addEntradaMock = vi.spyOn(CaixaPrismaRepository.prototype, 'addEntrada')
            .mockRejectedValue(erro);

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        });

        const service = CaixaService.getInstance();
        const entrada: EntradaDTO = {
            tipo: TipoEntrada.PIX,
            responsavel: "Anderson",
            valor: 100,
        };

        await service.adicionaEntrada(entrada);

        expect(consoleSpy).toHaveBeenCalledWith("Erro ao adicionar entrada", erro);
        expect(addEntradaMock).toHaveBeenCalledWith(entrada);
    });
});
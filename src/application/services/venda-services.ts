import {VendaDTO} from "@/src/domain/types/venda-types";
import {VendaPrismaRepositor} from "@/src/infra/prisma/repositories/venda-prisma-repository"

export class VendaServices {
    private vendaRepo: VendaPrismaRepositor;
    private static instance: VendaServices;

    private constructor() {
        this.vendaRepo = new VendaPrismaRepositor();
    }

    static getInstance(): VendaServices {
        if (!VendaServices.instance) {
            VendaServices.instance = new VendaServices();
        }
        return VendaServices.instance;
    }

    async gerarVenda(venda: VendaDTO) {
        await this.vendaRepo.addVenda(venda);

    }
}

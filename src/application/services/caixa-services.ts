import {Autorizacao, EntradaDTO, SaidaDTO, ValoresCaixa} from "@/src/domain/types/caixa-types";
import {SaidaToDTO} from "@/src/infra/prisma/mappers/saida-dto.mapper";
import {EntradaToDTO} from "@/src/infra/prisma/mappers/entrada-dto.mapper";
import {CaixaPrismaRepository} from "@/src/infra/prisma/repositories/caixa-prisma-repository";

interface EntradasSaidas {
    entradas: EntradaDTO[];
    saidas: SaidaDTO[];
}
export interface Mensagem{
    sucesso:string;
    erro:string;
}

export class CaixaService {
    private static instance: CaixaService;
    private caixaRepo = new CaixaPrismaRepository();

    private constructor() {
    }

    static getInstance(): CaixaService {
        if (!CaixaService.instance) {
            CaixaService.instance = new CaixaService();
        }
        return CaixaService.instance;
    }


    async getValoresCaixaDia(autorizacao: Autorizacao): Promise<ValoresCaixa> {
        const [entradasHoje, saidasHoje] = await Promise.all([
            this.getEntradasDoDia(),
            this.getSaidasDoDia(),
        ]);

        const resumo = this.calcularResumoMovimentacao({
            entradas: entradasHoje ?? [],
            saidas: saidasHoje ?? [],
        });

        const saldo = resumo.entradas - resumo.saidas;

        return {
            total: saldo,
            totalEntradas: resumo.entradas,
            totalSaidas: resumo.saidas,
        }
    }

    getValoresTodosCaixa(): number {
        return 100000.00;
    }

    async adicionaEntrada(entrada: EntradaDTO) {
        await this.caixaRepo.addEntrada(entrada).catch((error)=> console.error("Erro ao adicionar entrada", error));
    }

    async adicionarSaida(saida:SaidaDTO){
        await this.caixaRepo.addSaida(saida).catch((error)=> console.error("Erro ao adicionar saida", error))
    }

    async abrirCaixa(autorizacao: Autorizacao) {
        await this.caixaRepo.getCaixa(autorizacao);
    }

    async fecharCaixa(autorizacao:Autorizacao):Promise<Mensagem> {
        try {
            await this.caixaRepo.fecharCaixa(autorizacao);
            return {sucesso:"Caixa Fechado Com Sucesso!",erro:""};
        }catch (error){
            console.error("Erro ao fechar o caixa",error);
            return {sucesso:"",erro:"Erro ao Fechar Caixa!"};
        }

    }

    async getSaidasTodosCaixas(): Promise<SaidaDTO[]> {
        try {
            const listaSaidas = await this.caixaRepo.listarTodasSaidas();

            return listaSaidas.map(SaidaToDTO);
        } catch (error) {
            return [];
        }
    }

    async getEntradasTodosCaixas(): Promise<EntradaDTO[]> {
        try {
            const listaEntradas = await this.caixaRepo.listarTodasEntradas();
            return listaEntradas.map(EntradaToDTO);
        } catch (error) {
            return [];
        }
    }

    async getEntradasDoDia() {
        return await this.caixaRepo.listarEntradasDoDia(this.getDataHoje());
    }

    async getSaidasDoDia() {
        return await this.caixaRepo.listarSaidasDoDia(this.getDataHoje());
    }

    private calcularResumoMovimentacao({entradas, saidas}: EntradasSaidas) {
        const totalEntradas = entradas.reduce(
            (soma, entrada) => soma + entrada.valor, 0
        );

        const totalSaidas = saidas.reduce(
            (soma, saida) => soma + saida.valor, 0
        );
        return {
            entradas: totalEntradas,
            saidas: totalSaidas,
        }
    }

    private getDataHoje(): Date {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return hoje;
    }
}
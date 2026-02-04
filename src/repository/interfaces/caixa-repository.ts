import {Autorizacao, CaixaDTO, EntradaDTO, SaidaDTO} from "@/src/domain/types/caixa-types";
import {CaixaComAberturaFechamento} from "@/src/infra/prisma/repositories/caixa-prisma-repository";
import {Mensagem} from "@/src/application/services/caixa-services";

export interface CaixaRepository {
    listarEntradasDoDia(data: Date): Promise<EntradaDTO[]>;

    listarSaidasDoDia(data: Date): Promise<SaidaDTO[]>;

    listarTodasEntradas(): Promise<EntradaDTO[]>;

    listarTodasSaidas(): Promise<SaidaDTO[]>;

    abrirCaixa(autorizacao: Autorizacao): Promise<void>;

    addEntrada(entrada: EntradaDTO): Promise<void>;

    addSaida(saida: SaidaDTO): Promise<void>;

    fecharCaixa(autorizacao: Autorizacao): Promise<CaixaComAberturaFechamento | null>;

    getCaixa(data: Date): Promise<CaixaComAberturaFechamento | null>;
}
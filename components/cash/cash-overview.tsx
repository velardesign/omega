"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import {Button} from "../ui/button";
import {Lock} from "lucide-react";
import {useEffect, useState} from "react";
import CashFlow from "../modals/cash/cash-flow";
import {caixaDoDia, carregarResumoCaixa, todasEntradasDoDia, todasSaidaDoDia} from "@/actions/caixa-action";
import TableCash from "@/components/cash/table-cash";
import {TableCashData} from "@/src/domain/types/cash-types";
import {ResumoCaixa} from "@/src/domain/types/caixa-types";
import {clearInterval, setInterval} from "node:timers";
import {hidden} from "next/dist/lib/picocolors";

export default function CashOverview() {
    const [open, setOpen] = useState(false);
    const [resumoCaixaAtual, setResumoCaixaAtual] = useState<ResumoCaixa | null>(null);
    const [listaEntradas, setListaEntradas] = useState<TableCashData[]>([]);
    const [listaSaidas, setListaSaidas] = useState<TableCashData[]>([]);
    const [caixaFechado, setCaixaFechado] = useState(false);

    async function carrega() {

        const [resumoCaixa, saidas, entradas, caixa] = await Promise.all([
            carregarResumoCaixa(),
            todasSaidaDoDia(),
            todasEntradasDoDia(),
            caixaDoDia(),
        ]);

        const entradasDTO: TableCashData[] = entradas.map((entrada) => ({
            tipo: entrada.tipo,
            responsavel: entrada.responsavel,
            data_hora: entrada.data_hora,
            valor: Number(entrada.valor),
        }));

        const saidasDTO: TableCashData[] = saidas.map((saida) => ({
            tipo: saida.tipo,
            responsavel: saida.responsavel,
            data_hora: saida.data_hora,
            valor: Number(saida.valor),
        }))

        if (caixa) {
            setCaixaFechado(caixa.abertura != null && caixa.fechamento != null);
        }

        setResumoCaixaAtual(resumoCaixa);
        setListaEntradas(entradasDTO);
        setListaSaidas(saidasDTO);


        return;
    }

    useEffect(() => {
        carrega().catch((error) => console.error("erro ao carregar dados: ", error));
        const id = setInterval(carrega, 30000);
        return () => clearInterval(id);
    }, [caixaFechado]);


    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <Card className="flex flex-col h-95">
                    <CardHeader>
                        <CardTitle>Lista de Entradas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={listaEntradas} corTexto={"text-green-700"}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-green-700">
                            Total Entradas R$ {resumoCaixaAtual?.valoresCaixaAtual.totalEntradas.toFixed(2)}
                        </CardTitle>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col h-95 ">
                    <CardHeader>
                        <CardTitle>Lista de Saidas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={listaSaidas} corTexto={"text-red-400"}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-red-400">
                            Total Saidas R$ - {resumoCaixaAtual?.valoresCaixaAtual.totalSaidas.toFixed(2)}
                        </CardTitle>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Valores no Caixa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {caixaFechado ? (
                            <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                                <span className="font-medium">
                                    Operação não permitida.
                                </span>

                                <span className="font-medium">
                                   O caixa já foi fechado hoje.
                                </span>

                            </div>
                        ) : null}
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-center justify-between">
                            <Button
                                variant={"outline"}
                                onClick={() => setOpen(true)}
                                disabled={caixaFechado}
                            >
                                <Lock className="w-8 h-8 mr-2 text-red-500"/>
                                Fechar Caixa
                            </Button>
                            <CashFlow open={open} onOpenChange={setOpen}/>
                            <span className="text-right text-2xl">
                Total em Caixa <span
                                className="text-green-700 ml-2">R$ {resumoCaixaAtual?.valoresCaixaAtual.total.toFixed()}</span>
              </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

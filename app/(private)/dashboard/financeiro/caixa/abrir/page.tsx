"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TableCash from "@/components/cash/table-cash";
import {Button} from "@/components/ui/button";
import {DoorOpen} from "lucide-react";
import {useEffect, useState} from "react";
import CashFlowOpen from "@/components/modals/cash/cash-flow-open";
import {todasSaidas, todasEntradas, carregarResumoCaixa, caixaDoDia} from "@/actions/caixa-action";
import {EntradaDTO, SaidaDTO} from "@/src/domain/types/caixa-types";

export default function CashFlowOpenPage() {
    const [open, setOpen] = useState(false);
    const [listaTodasSaidas, setListaTodasSaidas] = useState<SaidaDTO[]>([]);
    const [listaTodasEntradas, setListaTodasEntradas] = useState<EntradaDTO[]>([]);
    const [valorTotalEntradas, setValorTotalEntradas] = useState(0.00);
    const [valorTotalSaidas, setValorTotalSaidas] = useState(0.00);
    const [saldoCaixa, setSaldoCaixa] = useState(0.00);
    const [bloquearBotao, setBloquearBotao] = useState(false);


    async function carregar() {
        const [listaSaidasTodosCaixas, listaEntradaTodosCaixas, resumoCaixa, caixa] = await Promise.all([
            todasSaidas(),
            todasEntradas(),
            carregarResumoCaixa(),
            caixaDoDia(),
        ]);

        setListaTodasSaidas(listaSaidasTodosCaixas);
        setListaTodasEntradas(listaEntradaTodosCaixas);
        setValorTotalSaidas(resumoCaixa.saidasAcumuladas);
        setValorTotalEntradas(resumoCaixa.entradasAcumuladas);
        setSaldoCaixa(resumoCaixa.saldoAcumulado);

        if (!caixa) {
            setBloquearBotao(false);
            return;
        }

        if (caixa.abertura != null && caixa.fechamento != null) {
            setBloquearBotao(true);
            return;
        }

        if (caixa.abertura != null) {
            setBloquearBotao(true);
            return;
        }
        return;
    }

    useEffect(() => {
        carregar().catch((error) => console.error("Error ao carregar informaçõe do caixa", error));
        const id = setInterval(carregar, 30000);
        return () => clearInterval(id);
    }, [bloquearBotao]);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <Card className="flex flex-col h-95">
                    <CardHeader>
                        <CardTitle>Entradas Todos os Caixas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={listaTodasEntradas} corTexto={"text-green-700"}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-green-700">
                            Total Entradas: R$ {valorTotalEntradas.toFixed(2)}
                        </CardTitle>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col h-95">
                    <CardHeader>
                        <CardTitle>Saidas Todos os Caixas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={listaTodasSaidas} corTexto={"text-red-400"}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-red-400">
                            Total Saidas R$ - {valorTotalSaidas.toFixed(2)}
                        </CardTitle>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Valores em Caixa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {bloquearBotao ? (
                            <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                                <span className="font-medium">
                                    Operação não permitida.
                                </span>

                                <span className="font-medium">
                                   O caixa já foi aberto hoje.
                                </span>

                            </div>
                        ) : null}
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-center justify-between">
                            <Button
                                variant={"outline"}
                                onClick={() => setOpen(true)}
                                disabled={bloquearBotao}
                            >
                                <DoorOpen className="w-8 h-8 mr-2 text-blue-500"/>
                                Abrir Caixa
                            </Button>
                            <CashFlowOpen open={open} onOpenChange={setOpen}/>
                            <span className="text-right text-2xl">Total
                                <span className="text-green-700 ml-2">
                                    R$ {saldoCaixa.toFixed(2)}
                                </span>
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
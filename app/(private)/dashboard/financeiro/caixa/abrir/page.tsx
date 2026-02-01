"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TableCash from "@/components/cash/table-cash";
import {Button} from "@/components/ui/button";
import {DoorOpen} from "lucide-react";
import {useEffect, useState} from "react";
import CashFlowOpen from "@/components/modals/cash/cash-flow-open";
import {todasSaidas, todasEntradas, carregarResumoCaixa} from "@/actions/caixa-action";
import {EntradaDTO,SaidaDTO} from "@/src/domain/types/caixa-types";

export default function CashFlowOpenPage() {
    const [open, setOpen] = useState(false);
    const [listaTodasSaidas, setListaTodasSaidas] = useState<SaidaDTO[]>([]);
    const [listaTodasEntradas, setListaTodasEntradas] = useState<EntradaDTO[]>([]);
    const [valorTotalEntradas, setValorTotalEntradas] = useState(0.00);
    const [valorTotalSaidas, setValorTotalSaidas] = useState(0.00);
    const [saldoCaixa, setSaldoCaixa] = useState(0.00);


    async function carregar() {
        const [listaSaidasTodosCaixas, listaEntradaTodosCaixas, resumoCaixa] = await Promise.all([
            todasSaidas(),
            todasEntradas(),
            carregarResumoCaixa()
        ]);

        setListaTodasSaidas(listaSaidasTodosCaixas);
        setListaTodasEntradas(listaEntradaTodosCaixas);
        setValorTotalSaidas(resumoCaixa.saidasAcumuladas);
        setValorTotalEntradas(resumoCaixa.entradasAcumuladas);
        setSaldoCaixa(resumoCaixa.saldoAcumulado);
        return;
    }

    useEffect(() => {
        carregar().catch((error) => console.error("Error ao carregar informaçõe do caixa", error));
    }, []);

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
                        <div className="grid grid-cols-2 gap-2 justify-end text-right ml-auto w-max  text-2xl">
                            <span className="text-left"></span>
                            <span className="font-medium text-cyan-500"></span>

                            <span className="text-left"></span>
                            <span className="font-medium text-cyan-500"></span>

                            <span className="text-left"></span>
                            <span className="font-medium text-cyan-500"></span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-center justify-between">
                            <Button variant={"outline"} onClick={() => setOpen(true)}>
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
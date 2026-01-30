"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TableCash from "@/components/cash/table-cash";
import {cashMock} from "@/mocks/cash-mock";
import {Button} from "@/components/ui/button";
import {DoorOpen} from "lucide-react";
import CashFlow from "@/components/modals/cash/cash-flow";
import {useState} from "react";
import {Open_Sans} from "next/dist/compiled/@next/font/dist/google";
import CashFlowOpen from "@/components/modals/cash/cash-flow-open";

export default function CashFlowOpenPage() {
    const [open, setOpen] = useState(false);
    const totalEntradas = cashMock
        .flat()
        .reduce((sum, cash) => sum + cash.price, 0);
    const totalSaidas = cashMock
        .flat()
        .reduce((sum, cash) => sum + cash.price, 0);
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <Card className="flex flex-col h-70">
                    <CardHeader>
                        <CardTitle>Entradas Todos os Caixas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={cashMock}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-green-700">
                            Total Entradas: R$ {totalEntradas}
                        </CardTitle>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col h-70">
                    <CardHeader>
                        <CardTitle>Saidas Todos os Caixas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <TableCash data={cashMock}/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-red-400">
                            Total Saidas R$ {totalSaidas}
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
                            <span className="text-left">Dinheiro</span>
                            <span className="font-medium text-cyan-500">R$ 0,00</span>

                            <span className="text-left">Pix</span>
                            <span className="font-medium text-cyan-500">R$ 0,00</span>

                            <span className="text-left">Cartão</span>
                            <span className="font-medium text-cyan-500">R$ 0,00</span>
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
                                    R$ {(totalEntradas - totalSaidas <= 0 ? "10000,00" : totalEntradas - totalSaidas)}
                                </span>
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
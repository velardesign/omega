import {CalendarDays, FileChartColumn, MinusCircle, PlusCircle, Wallet} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Separator} from "../ui/separator";
import {Button} from "../ui/button";
import {ValoresCaixa} from "@/src/domain/types/caixa-types";
import {useState} from "react";
import {DialogAddEntrada} from "@/components/dashboard/dialog-add-entrada";
import {DialogAddSaida} from "@/components/dashboard/dialog-add-saida";

interface FinancialOverviewProps {
    valoresCaixa: ValoresCaixa,
    valoresTodosCaixas: number
}

export default function FinancialOverview({valoresCaixa, valoresTodosCaixas}: FinancialOverviewProps) {
    const [openEntrada, setOpenEntrada] = useState(false);
    const [openSaida, setOpenSaida] = useState(false);
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-base">Valores em Caixa</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    <Wallet className=" w-6 h-6 md:w-12 md:h-12 text-blue-500"/>
                    <span className="text-center text-2xl">R$ {valoresTodosCaixas.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} </span>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="icon" title="Verificar Valores">
                        <FileChartColumn className="w-6 h-6 text-blue-500"/>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-base">Caixa do Dia</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    <CalendarDays className=" w-6 h-6 md:w-12 md:h-12 text-green-600"/>
                    <span className="text-center text-2xl">R$ {valoresCaixa.total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} </span>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="icon" title="Verificar Caixa">
                        <FileChartColumn className="w-6 h-6 text-green-600"/>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-base">Entradas do Dia</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    <PlusCircle className=" w-6 h-6 md:w-12 md:h-12 text-green-600"/>
                    <span className="text-center text-2xl">R$ {valoresCaixa.totalEntradas.toLocaleString("pt-BR",{
                        minimumFractionDigits:2,
                        maximumFractionDigits:2,
                    })}</span>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Adicionar Entrada"
                        onClick={() => setOpenEntrada(true)}
                    >
                        <PlusCircle className="w-6 h-6 text-green-600"/>
                    </Button>
                    <DialogAddEntrada usuario={{nome: "Anderson"}} open={openEntrada} onOpenChange={setOpenEntrada}/>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-base">Saidas do Dia</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    <MinusCircle className=" w-6 h-6 md:w-12 md:h-12 text-red-500"/>
                    <span className="text-center text-2xl">R$ - {valoresCaixa.totalSaidas.toLocaleString("pt-BR",{
                        minimumFractionDigits:2,
                        maximumFractionDigits:2,
                    })} </span>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Adicionar Saida"
                        onClick={() => setOpenSaida(true)}
                    >
                        <MinusCircle className="w-6 h-6 text-red-500"/>
                    </Button>
                    <DialogAddSaida usuario={{nome: "Anderson"}} open={openSaida} onOpenChange={setOpenSaida}/>
                </CardFooter>
            </Card>
        </div>
    )
}
 
 
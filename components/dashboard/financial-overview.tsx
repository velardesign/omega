import { CalendarDays, FileChartColumn, MinusCircle, PlusCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

 export default function FinancialOverview(){
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">Valores em Caixa</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            <Wallet className=" w-6 h-6 md:w-12 md:h-12 text-blue-500" />
            <span className="text-center text-2xl">R$ 150.000,00 </span>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="icon" title="Verificar Valores">
              <FileChartColumn className="w-6 h-6 text-blue-500" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">Caixa do Dia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            <CalendarDays className=" w-6 h-6 md:w-12 md:h-12 text-green-600" />
            <span className="text-center text-2xl">R$ 50.000,00 </span>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="icon" title="Verificar Caixa">
              <FileChartColumn className="w-6 h-6 text-green-600" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">Entradas do Dia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            <PlusCircle className=" w-6 h-6 md:w-12 md:h-12 text-green-600" />
            <span className="text-center text-2xl">R$ 20.000,00 </span>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="icon" title="Adicionar Entrada">
              <PlusCircle className="w-6 h-6 text-green-600" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">Saidas do Dia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            <MinusCircle className=" w-6 h-6 md:w-12 md:h-12 text-red-500" />
            <span className="text-center text-2xl">R$ -20.000,00 </span>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="icon" title="Adicionar Saida">
              <MinusCircle className="w-6 h-6 text-red-500" />
            </Button>
          </CardFooter>
        </Card>
      </div>
  )
 }
 
 
"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TableCash from "./table-cash";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import CashFlow from "../modals/cash/cash-flow";

export default function CashOverview() {
  const[open,setOpen] = useState(false);  

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card className="flex flex-col h-70">
          <CardHeader>
            <CardTitle>Lista de Entradas</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {/*<TableCash data={} />*/}
          </CardContent>
          <CardFooter>
            <CardTitle className="text-green-700">
              Total Entradas R$ {}
            </CardTitle>
          </CardFooter>
        </Card>
        <Card className="flex flex-col h-70">
          <CardHeader>
            <CardTitle>Lista de Saidas</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {/*<TableCash data={} />*/}
          </CardContent>
          <CardFooter>
            <CardTitle className="text-red-400">
              Total Saidas R$ {}
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
            <div className="grid grid-cols-2 gap-2 justify-end text-right ml-auto w-max  text-2xl">
              <span className="text-left">Dinheiro</span>
              <span className="font-medium text-cyan-500">R$ 10,00</span>

              <span className="text-left">Pix</span>
              <span className="font-medium text-cyan-500">R$ 10,00</span>

              <span className="text-left">Cartão</span>
              <span className="font-medium text-cyan-500">R$ 10,00</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-between">
              <Button variant={"outline"} onClick={() => setOpen(true)}>
                <Lock className="w-8 h-8 mr-2 text-red-500" />
                Fechar Caixa
              </Button>
              <CashFlow open={open} onOpenChange={setOpen}/>
              <span className="text-right text-2xl">
                Total em Caixa <span className="text-green-700 ml-2">R$ {0.00}</span>
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

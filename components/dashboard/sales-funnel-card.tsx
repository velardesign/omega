import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FunnelStage } from "@/types/dashboard-types";
import TableSaleFunnel from "./table-sale-funnel";

export default function SalesFunnelCard({ stages }: { stages: FunnelStage[] }) {
    const somaTotal = stages.flatMap((stage => stage.data)).reduce((sum,row)=> sum + row.price,0);
  return (
    <div>

      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Vendas</CardTitle>
        </CardHeader>
        <CardContent className="bg-background p-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-background">
           
     {stages.map((stage,index)=> {
            return (  
             <Card key={index}>
              <CardHeader>
                <CardTitle>{stage.label}</CardTitle>
                <p className="text-right">R$ {stage.data.reduce((total,item) => total + item.price,0)}</p>
              </CardHeader>
              <CardContent>
                <TableSaleFunnel data={stage.data} />
              </CardContent>
            </Card>
            )
        })}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

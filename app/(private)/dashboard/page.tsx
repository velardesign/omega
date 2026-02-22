"use client"
import FinancialOverview from "@/components/dashboard/financial-overview";
import SalesFunnelCard from "@/components/dashboard/sales-funnel-card";
import {Separator} from "@/components/ui/separator";
import {salesFunnelMock} from "@/__tests__/mocks/sales-funnel-mocks";
import {useEffect, useState} from "react";
import {carregarResumoCaixa} from "@/actions/caixa-action";
import {ValoresCaixa} from "@/src/domain/types/caixa-types";
import {Skeleton} from "@/components/ui/skeleton";

interface ResumoCaixa {
    valoresCaixaAtual: ValoresCaixa,
    saldoAcumulado: number,
    entradasAcumuladas: number,
    saidasAcumuladas: number,
}

export default function Home() {
    const [data, setData] = useState<ResumoCaixa | null>(null);

    async function carregar() {
        const result = await carregarResumoCaixa();
        setData(result);
    }

    useEffect(() => {
        carregar().catch((error) => console.log("erro ao buscar dados", error));

        const id = setInterval(() => {
            if (document.visibilityState === "visible") {
                carregar().catch((error) => console.log("erro ao buscar dados", error));
            }
        }, 30000);

        return () => clearInterval(id);
    }, []);

    if (!data) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Skeleton className="h-10 w-48"/>
                <Skeleton className="h-32 w-full"/>
                <Skeleton className="h-32 w-full"/>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <FinancialOverview valoresCaixa={data.valoresCaixaAtual} valoresTodosCaixas={data.saldoAcumulado}/>
            <Separator/>
            <SalesFunnelCard stages={salesFunnelMock}/>
        </div>
    );
}

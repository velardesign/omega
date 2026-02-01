"use client"
import FinancialOverview from "@/components/dashboard/financial-overview";
import SalesFunnelCard from "@/components/dashboard/sales-funnel-card";
import {Separator} from "@/components/ui/separator";
import {salesFunnelMock} from "@/__tests__/mocks/sales-funnel-mocks";
import {useEffect, useState} from "react";
import {carregarResumoCaixa} from "@/actions/caixa-action";

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
        console.log("Carregando os dados do Dashboard...")
    }

    useEffect(() => {
        carregar().catch((error) => console.log("erro ao buscar dados", error));
        const id = setInterval(carregar, 30000)
        return () => clearInterval(id);
    }, []);

    if (!data) {
        return null
    }
    ;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <FinancialOverview valoresCaixa={data.valoresCaixaAtual} valoresTodosCaixas={data.saldoAcumulado}/>
            <Separator/>
            <SalesFunnelCard stages={salesFunnelMock}/>
        </div>
    );
}

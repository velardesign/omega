import FinancialOverview from "@/components/dashboard/financial-overview";
import SalesFunnelCard from "@/components/dashboard/sales-funnel-card";
import { Separator } from "@/components/ui/separator";
import { salesFunnelMock } from "@/mocks/sales-funnel-mocks";
import {getCaixaDia, getValoresTodosCaixa} from "@/services/caixa-services";

export default async function Home() {
    const valoresCaixa = getCaixaDia();
    const valoresTodosCaixas = getValoresTodosCaixa();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <FinancialOverview valoresCaixa={valoresCaixa} valoresTodosCaixas ={valoresTodosCaixas}/>
      <Separator />
      <SalesFunnelCard stages={salesFunnelMock} />
    </div>
  );
}

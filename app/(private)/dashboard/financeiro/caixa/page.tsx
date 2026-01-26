import FinancialOverview from "@/components/dashboard/financial-overview";
import { Separator } from "@/components/ui/separator";

export default function CashFlowPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <FinancialOverview />
      <Separator />
    </div>
  );
}

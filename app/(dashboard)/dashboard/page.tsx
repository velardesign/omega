"use client";

import FinancialOverview from "@/components/dashboard/financial-overview";
import SalesFunnelCard from "@/components/dashboard/sales-funnel-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { salesFunnelMock } from "@/mocks/sales-funnel-mocks";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <FinancialOverview />
      <Separator />
      <SalesFunnelCard stages={salesFunnelMock} />
    </div>
  );
}

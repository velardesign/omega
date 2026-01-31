"use client"
import CashOverview from "@/components/cash/cash-overview";
import { Separator } from "@/components/ui/separator";

export default function CashFlowClosePage(){
    return(
         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <CashOverview />
              <Separator />
            </div>
    )
}
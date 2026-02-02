import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/components/cash/tabela-valores-receber";
import {columns} from "@/data/tabela-valores-receber-colunas";
import {payments} from "@/__tests__/mocks/tabela-mock";

export default function CashFlowPaymentPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-base">Valores a Receber</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                        <div className="container mx-auto py-1">
                            <DataTable columns={columns} data={payments}/>
                        </div>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-base">Valores a Receber</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-base">Valores a Receber</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-base">Valores a Receber</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
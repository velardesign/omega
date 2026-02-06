"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {TableCashData} from "@/src/domain/types/cash-types";

interface TableCashProps{
    data: TableCashData[];
    corTexto:string;
}
export default function TableCash({data, corTexto}: TableCashProps) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Responsável</TableHead>
                        <TableHead className="text-left">Valor</TableHead>
                        <TableHead className="text-left">Data e Hora</TableHead>
                        <TableHead className="text-left">Tipo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((c, index) => {
                        return (
                            <TableRow key={index} className={corTexto}>
                                <TableCell className="text-left">{c.responsavel}</TableCell>
                                <TableCell className="text-left">R$ {c.valor.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</TableCell>
                                <TableCell className="text-left">{c.data_hora?.toLocaleString("pt-BR")}</TableCell>
                                <TableCell className="text-left">{c.tipo}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableCaption></TableCaption>
            </Table>
        </>
    );
}

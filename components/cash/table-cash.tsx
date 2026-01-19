import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCashData } from "@/types/cash-types";

export default function TableCash({ data }: { data: TableCashData[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Código</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Data e Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((c, index) => {
              return (
                <TableRow key={index} className={c.price > 0 ? "text-green-600":"text-red-400"}>
                  <TableCell>{c.cod}</TableCell>
                  <TableCell className="text-right">R$ {c.price.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-right">{c.date.toLocaleString("pt-BR")}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </>
  );
}

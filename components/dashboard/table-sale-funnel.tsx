import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableFunelData } from "@/types/dashboard-types";

export default function TableSaleFunnel({ data }: { data: TableFunelData[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor da Proposta</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((c, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>R$ {c.price.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>{c.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </>
  );
}

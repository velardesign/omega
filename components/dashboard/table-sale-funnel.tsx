import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableFunelData } from "@/src/domain/types/dashboard-types";

export default function TableSaleFunnel({ data }: { data: TableFunelData[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((c, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell className="text-right">R$ {c.price.toLocaleString("pt-BR")}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </>
  );
}

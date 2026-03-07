import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";

export interface ProdutoProp {
    produtos: ProdutoDTO[],
}

export default function EditaProduto(produtoProp: ProdutoProp) {
    const {produtos} = produtoProp;
    return (
        <div>
            <Card className={"flex flex-col"}>
                <CardHeader>Editar Produto</CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Produtos Cadastrados no Sistema</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Código Fabricante</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Cor</TableHead>
                                <TableHead>Material</TableHead>
                                <TableHead>Código Fornecedor</TableHead>
                                <TableHead>Código Categoria</TableHead>
                                <TableHead>Alterar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                produtos.map((produto, key) => (
                                    <TableRow key={key}>
                                        <TableCell>{produto.codigo}</TableCell>
                                        <TableCell>{produto.codigo_fabricante}</TableCell>
                                        <TableCell>{produto.nome}</TableCell>
                                        <TableCell>{produto.cor}</TableCell>
                                        <TableCell>{produto.material}</TableCell>
                                        <TableCell>{produto.codigo_fornecedor}</TableCell>
                                        <TableCell>{produto.codigo_categoria}</TableCell>
                                        <TableCell>
                                            <Button variant={"outline"}>
                                                <Pencil className={"text-blue-500"}/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
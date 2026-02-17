import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";

interface Categoria {
    codigo: string;
    nome: string;
}

export interface CategoriaProps {
    categorias: Categoria[];
}

export default function EditaCategoria(props: CategoriaProps) {
    const {categorias} = props;

    return (
        <Card className={"flex flex-col"}>
            <CardHeader>Editar Categoria</CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Categorias Cadastradas no Sistema</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Alterar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categorias.map((categoria, key) => (
                            <TableRow key={key}>
                                <TableCell>{categoria.codigo}</TableCell>
                                <TableCell>{categoria.nome}</TableCell>
                                <TableCell>
                                    <Button variant={"outline"}>
                                        <Pencil
                                            className={"text-blue-500"}>
                                        </Pencil>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
        ;
}
"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel, SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useRouter} from "next/navigation";
import {Plus, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {addProduto} from "@/actions/produto-action";

interface PropsCategoria {
    nome: string;
    codigo: string;
}

interface PropsFornecedor {
    razao_social: string;
    codigo: string | null;
}

export interface PropsProduto {
    categorias: PropsCategoria[];
    fornecedores: PropsFornecedor[];
}

export default function AdicionaProduto(props: PropsProduto) {

    const {categorias, fornecedores} = props;
    const urlCategoria = "/dashboard/categoria/adicionar";
    const urlFornecedor = "/dashboard/fornecedores/cadastrar-fornecedor"
    const router = useRouter();

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Cadastro Produto</CardTitle>
                </CardHeader>
                <form action={}>
                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                        <Select onValueChange={(value) => {
                            if (value === "nova_categoria") {
                                router.push(urlCategoria);
                            }
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione a Categoria do Produto"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categorias</SelectLabel>
                                    {
                                        categorias.map((c, k) => (
                                                <SelectItem value={c.codigo} key={k}>{c.nome}</SelectItem>
                                            )
                                        )
                                    }
                                </SelectGroup>
                                <SelectSeparator></SelectSeparator>
                                <SelectGroup>
                                    <SelectItem value="nova_categoria" className="flex items-center gap-2 ">
                                        <Plus className="h-4, w-4"/>
                                        Cadastrar Categoria
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => {
                            if (value === "novo_fornecedor") {
                                router.push(urlFornecedor);
                            }
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o Fornecedor do Produto"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fornecedores</SelectLabel>
                                    {
                                        fornecedores.map((f, k) => (
                                                <SelectItem value={f.codigo || "#"} key={k}>{f.razao_social}</SelectItem>
                                            )
                                        )
                                    }
                                </SelectGroup>
                                <SelectSeparator></SelectSeparator>
                                <SelectGroup>
                                    <SelectItem value="novo_fornecedor" className="flex items-center gap-2 ">
                                        <Plus className="h-4, w-4"/>
                                        Cadastrar Fornecedor
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input placeholder="Código do Fabricante" name={"codigo_fabricante"}/>
                        <Input placeholder="Nome do Produto" name={"nome"}/>
                        <Input placeholder="Preço de Compra" name={"preco_compra"}/>
                        <Input placeholder="Unidade de Medida" name={"unidade_medida"}/>
                        <Input placeholder="Cor" name={"cor"}/>
                        <Input placeholder="Material" name={"material"}/>
                        <Textarea placeholder={"Descrição do Produto"} className={"col-span-2"} name={"descricao"}/>
                    </CardContent>
                    <CardFooter>
                        <Button variant={"outline"} type={"submit"}><PlusCircle className={"text-green-500"}/>Cadastrar</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
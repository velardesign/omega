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
import {produtoCriarSchema, ProdutoInput, ProdutoOutput} from "@/schemas/produto-criar-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useRef} from "react";

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

function FieldError({error}: { error?: string }) {
    if (!error) return null;
    return (
        <p className="text-sm text-red-400 py-2">{error}</p>
    )
}

export default function AdicionaProduto(props: PropsProduto) {

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: {errors},
    } = useForm<ProdutoInput, any, ProdutoOutput>({
        resolver: zodResolver(produtoCriarSchema),
        defaultValues: {
        codigo: "0000",
    }
    })

    const errorRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (errors.root) {
            errorRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [errors.root]);

    async function onSubmit(produto: ProdutoOutput) {
        console.log(produto);
        const result = await addProduto(produto);
        if (result.success) {
            reset();
            return;
        }
        setError("root", {message: result.error});
    }

    console.log(errors)

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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid auto-rows-min gap-4 md:grid-cols-1"
                >
                    {
                        errors.root && (
                            <p
                                ref={errorRef}
                                tabIndex={-1}
                                className="text-sm text-center text-red-400 p-3 rounded-md border"
                            >
                                {errors.root.message}
                            </p>
                        )
                    }
                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                        <div className={"flex flex-col gap-1"}>
                            <input type="hidden" {...register("codigo_categoria")} />
                            <input type="hidden" {...register("codigo_fornecedor")} />
                            <Select onValueChange={(value) => {
                                if (value === "nova_categoria") {
                                    router.push(urlCategoria);
                                    return;
                                }
                                setValue("codigo_categoria", value, {shouldValidate: true});
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
                                            <Plus className="h-4 w-4"/>
                                            Cadastrar Categoria
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError error={errors.codigo_categoria?.message}/>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <Select onValueChange={(value) => {
                                if (value === "novo_fornecedor") {
                                    router.push(urlFornecedor);
                                    return;
                                }
                                setValue("codigo_fornecedor", value, {shouldValidate: true});
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o Fornecedor do Produto"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fornecedores</SelectLabel>
                                        {
                                            fornecedores.map((f, k) => (
                                                    <SelectItem value={f.codigo || ""}
                                                                key={k}>{f.razao_social}</SelectItem>
                                                )
                                            )
                                        }
                                    </SelectGroup>
                                    <SelectSeparator></SelectSeparator>
                                    <SelectGroup>
                                        <SelectItem value="novo_fornecedor" className="flex items-center gap-2 ">
                                            <Plus className="h-4 w-4"/>
                                            Cadastrar Fornecedor
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError error={errors.codigo_fornecedor?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <input type="hidden" {...register("codigo")} />
                            <Input placeholder="Código do Fabricante" {...register("codigo_fabricante")}/>
                            <FieldError error={errors.codigo_fabricante?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Nome do Produto" {...register("nome")}/>
                            <FieldError error={errors.nome?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input
                                type={"number"}
                                step={"0.01"}
                                placeholder="Preço de Compra"
                                {...register("preco_compra")}
                            />
                            <FieldError error={errors.preco_compra?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Unidade de Medida" {...register("unidade_medida")}/>
                            <FieldError error={errors.unidade_medida?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Cor" {...register("cor")}/>
                            <FieldError error={errors.cor?.message}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Material" {...register("material")}/>
                            <FieldError error={errors.material?.message}/>
                        </div>
                        <div className={"col-span-2"}>
                            <Textarea placeholder={"Descrição do Produto"}{...register("descricao")}/>
                            <FieldError error={errors.descricao?.message}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant={"outline"} type={"submit"}><PlusCircle className={"text-green-500"}/>Cadastrar</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
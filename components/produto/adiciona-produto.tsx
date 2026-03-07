"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Toaster} from "@/components/ui/sonner"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useRouter} from "next/navigation";
import {Plus, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {saveProduto} from "@/actions/produto-action";
import {produtoCriarSchema, ProdutoInput, ProdutoOutput} from "@/schemas/produto-criar-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {toast} from "sonner";

interface PropsCategoria {
    nome: string;
    codigo: string;
}

interface PropsFornecedor {
    razao_social: string;
    codigo: string | null;
}

export interface PropsProduto {
    categorias: PropsCategoria[],
    fornecedores: PropsFornecedor[],
    produtoSelecionado?: ProdutoDTO | null
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
        watch,
        formState: {errors},
    } = useForm<ProdutoInput, any, ProdutoOutput>({
        resolver: zodResolver(produtoCriarSchema),
        defaultValues: {
            codigo: "0000",
        }
    });

    const codigoCategoria = watch("codigo_categoria");
    const codigoFornecedor = watch("codigo_fornecedor");
    const errorRef = useRef<HTMLParagraphElement>(null);
    const {categorias, fornecedores, produtoSelecionado} = props;
    const router = useRouter();
    const urlCategoria = "/dashboard/categoria/adicionar";
    const urlFornecedor = "/dashboard/fornecedores/cadastrar-fornecedor";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState<ProdutoDTO | null>(produtoSelecionado || null);

    useEffect(() => {
        if (errors.root) {
            errorRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [errors.root]);

    useEffect(() => {

        if (!produtoAtual) {
           reset({
            codigo: "0000",
            codigo_categoria: "",
            codigo_fornecedor: "",
            codigo_fabricante: "",
            nome: "",
            preco_compra: "" as any,
            unidade_medida: "",
            cor: "",
            material: "",
            descricao: "",
        });
            return;
        }

        reset({
            codigo: produtoAtual.codigo,
            codigo_categoria: produtoAtual.codigo_categoria,
            codigo_fornecedor: produtoAtual.codigo_fornecedor,
            codigo_fabricante: produtoAtual.codigo_fabricante,
            nome: produtoAtual.nome,
            preco_compra: Number(produtoAtual.preco_compra),
            unidade_medida: produtoAtual.unidade_medida,
            cor: produtoAtual.cor,
            material: produtoAtual.material,
            descricao: produtoAtual.descricao,
        });
        setValue("codigo_categoria", produtoAtual.codigo_categoria, {shouldValidate: false});
        setValue("codigo_fornecedor", produtoAtual.codigo_fornecedor ?? "", {shouldValidate: false});

    }, [produtoAtual, reset, setValue]);

    useEffect(() => {
        setProdutoAtual(produtoSelecionado || null);
    }, [produtoSelecionado]);

    async function onSubmit(produto: ProdutoOutput) {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const result = await saveProduto(produto);

        if (result.success) {
            toast.success(
                result.action === "create"
                    ? "Produto Cadastrado com sucesso!"
                    : "Produto Atualizado com sucesso!"
            );

            setProdutoAtual(null);
            reset({
            codigo: "0000",
            codigo_categoria: "",
            codigo_fornecedor: "",
            codigo_fabricante: "",
            nome: "",
            preco_compra: "" as any,
            unidade_medida: "",
            cor: "",
            material: "",
            descricao: "",
        });
            setIsSubmitting(false);

            return;
        }

        setError("root", {message: result.error});
        setIsSubmitting(false)
    }

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <Card className="flex flex-col">

                <CardHeader>
                    <CardTitle>
                        {produtoAtual ? "Editar Produto" : "Cadastro Produto"}
                    </CardTitle>
                </CardHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid auto-rows-min gap-4 md:grid-cols-1"
                >

                    {errors.root && (
                        <p
                            ref={errorRef}
                            tabIndex={-1}
                            className="text-sm text-center text-red-400 p-3 rounded-md border"
                        >
                            {errors.root.message}
                        </p>
                    )}

                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">

                        <div className="flex flex-col gap-1">

                            <input type="hidden" {...register("codigo_categoria")} />

                            <Select
                                value={codigoCategoria}
                                onValueChange={(value) => {

                                    if (value === "nova_categoria") {
                                        router.push(urlCategoria);
                                        return;
                                    }

                                    setValue("codigo_categoria", value, {shouldValidate: true});

                                }}
                            >

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a Categoria do Produto"/>
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectGroup>

                                        <SelectLabel>Categorias</SelectLabel>

                                        {categorias.map((c) => (
                                            <SelectItem key={c.codigo} value={c.codigo}>
                                                {c.nome}
                                            </SelectItem>
                                        ))}

                                    </SelectGroup>

                                    <SelectSeparator/>

                                    <SelectGroup>

                                        <SelectItem value="nova_categoria" className="flex items-center gap-2">

                                            <Plus className="h-4 w-4"/>
                                            Cadastrar Categoria

                                        </SelectItem>

                                    </SelectGroup>

                                </SelectContent>

                            </Select>

                            <FieldError error={errors.codigo_categoria?.message}/>

                        </div>

                        {/* FORNECEDOR */}

                        <div className="flex flex-col gap-1">

                            <input type="hidden" {...register("codigo_fornecedor")} />

                            <Select
                                value={codigoFornecedor}
                                onValueChange={(value) => {

                                    if (value === "novo_fornecedor") {
                                        router.push(urlFornecedor);
                                        return;
                                    }

                                    setValue("codigo_fornecedor", value, {shouldValidate: true});

                                }}
                            >

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o Fornecedor do Produto"/>
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectGroup>

                                        <SelectLabel>Fornecedores</SelectLabel>

                                        {fornecedores.map((f) => (
                                            <SelectItem key={f.codigo} value={f.codigo || ""}>
                                                {f.razao_social}
                                            </SelectItem>
                                        ))}

                                    </SelectGroup>

                                    <SelectSeparator/>

                                    <SelectGroup>

                                        <SelectItem value="novo_fornecedor" className="flex items-center gap-2">

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
                            <Input type="number" step="0.01"
                                   placeholder="Preço de Compra" {...register("preco_compra",{valueAsNumber:true})}/>
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

                        <div className="col-span-2">
                            <Textarea placeholder="Descrição do Produto" {...register("descricao")}/>
                            <FieldError error={errors.descricao?.message}/>
                        </div>

                    </CardContent>

                    <CardFooter>

                        <Button
                            variant="outline"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <PlusCircle className="text-green-500"/>
                            {isSubmitting ? "Salvando..." : produtoAtual ? "Atualizar Produto" : "Cadastrar"}
                        </Button>

                    </CardFooter>

                </form>

            </Card>
        </div>
    );
}
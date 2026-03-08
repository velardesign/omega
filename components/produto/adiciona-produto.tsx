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
import {Ban, Plus, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {PropsProduto} from "@/src/domain/types/produto-types";
import {useProdutoForm} from "@/hooks/use-produto-form";
import FieldError from "@/components/produto/field-error";
import {Controller} from "react-hook-form";
import {NumericFormat} from "react-number-format";
import {useRouter} from "next/navigation";
import {produtoFormDefaults} from "@/constants/produto-form-defaults";


export default function AdicionaProduto(props: PropsProduto) {
    const router = useRouter();
    const {
        produtoAtual,
        handleSubmit,
        onSubmit,
        errors,
        errorRef,
        register,
        codigoFornecedor,
        codigoCategoria,
        onNovaCategoria,
        onNovoFornecedor,
        onFornecedorChange,
        onCategoriaChange,
        isSubmitting,
        control,
        setProdutoAtual,
        reset,

    } = useProdutoForm(props);
    const {
        categorias,
        fornecedores,
    } = props;

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <Card className="flex flex-col">

                <CardHeader>
                    <CardTitle>
                        {produtoAtual ?
                            (
                                <div className={"flex flex-col gap-4"}>
                                    <span>Editar Produto</span>
                                    <span className="block text-blue-400">Código: {produtoAtual.codigo}</span>
                                </div>
                            ) : ("Cadastro Produto")
                        }
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

                    <CardContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">

                        <div className="flex flex-col gap-1">

                            <input type="hidden" {...register("codigo_categoria")} />

                            <Select
                                value={codigoCategoria ?? ""}
                                onValueChange={(value) => {

                                    if (value === "nova_categoria") {
                                        onNovaCategoria();
                                        return;
                                    }
                                    onCategoriaChange(value);
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

                        <div className="flex flex-col gap-1">

                            <input type="hidden" {...register("codigo_fornecedor")} />

                            <Select
                                value={codigoFornecedor ?? ""}
                                onValueChange={
                                    (value) => {

                                        if (value === "novo_fornecedor") {
                                            onNovoFornecedor();
                                            return;
                                        }
                                        onFornecedorChange(value);
                                    }
                                }
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
                            <Input
                                className={"w-full"}
                                placeholder="Código do Fabricante"
                                {...register("codigo_fabricante")}
                            />
                            <FieldError error={errors.codigo_fabricante?.message}/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className={"w-full"}
                                placeholder="Nome do Produto"
                                {...register("nome")}
                            />
                            <FieldError error={errors.nome?.message}/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Controller
                                name="preco_compra"
                                control={control}
                                render={({field}) => (
                                    <NumericFormat
                                        className={"w-full"}
                                        customInput={Input}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="R$ "
                                        decimalScale={2}
                                        fixedDecimalScale
                                        placeholder="Preço de Compra"
                                        value={field.value as string || ""}
                                        onValueChange={(values) => {
                                            field.onChange(values.value)
                                        }}
                                    />
                                )}
                            />
                            <FieldError error={errors.preco_compra?.message}/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className={"w-full"}
                                placeholder="Unidade de Medida" {...register("unidade_medida")}
                            />
                            <FieldError error={errors.unidade_medida?.message}/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className={"w-full"}
                                placeholder="Cor" {...register("cor")}
                            />
                            <FieldError error={errors.cor?.message}/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className={"w-full"}
                                placeholder="Material" {...register("material")}
                            />
                            <FieldError error={errors.material?.message}/>
                        </div>

                        <div className="flex flex-col gap-1 md:col-span-2">
                            <Textarea
                                className={"w-full"}
                                placeholder="Descrição do Produto" {...register("descricao")}
                            />
                            <FieldError error={errors.descricao?.message}/>
                        </div>

                    </CardContent>

                    <CardFooter className={"flex justify-end gap-4"}>
                        <Button
                            variant="outline"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <PlusCircle className="text-green-500"/>
                            {isSubmitting ? "Salvando..." : produtoAtual ? "Atualizar Produto" : "Cadastrar"}
                        </Button>

                        <Button
                            variant={"outline"}
                            type={"button"}
                            disabled={isSubmitting}
                            onClick={
                                () => {
                                    if(produtoAtual) {
                                         setProdutoAtual(null);
                                         reset(produtoFormDefaults);
                                    }else {
                                        router.push("/dashboard");
                                    }

                                }
                            }
                        >
                            <Ban className={"text-red-500"}/>
                            Cancelar
                        </Button>

                    </CardFooter>

                </form>

            </Card>
        </div>
    );
}
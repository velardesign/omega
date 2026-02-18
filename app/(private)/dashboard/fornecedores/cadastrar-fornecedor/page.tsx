"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import {useForm} from "react-hook-form";
import {UserCreateFormData, userCreateSchema} from "@/schemas/user-create-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FornecedorCriarFormData, fornecedorCriarSchema} from "@/schemas/fornecedor-criar-schema";
import {createUserAction} from "@/actions/create-user";
import {PlusCircle} from "lucide-react";
import {addFornecedor} from "@/actions/fornecedor-action";

export default function SupplierCreateForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FornecedorCriarFormData>({
        resolver: zodResolver(fornecedorCriarSchema),
    });

    function onSubmit(data: FornecedorCriarFormData) {
        addFornecedor(data);
        console.log("Dados validados:", data);
    }

    return (
        <div className="flex flex-col gap-4 p-4 pt-0">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-1 flex-col gap-4 p-4 pt-0"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Informações do fornecedor
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                        <div>
                            <Input placeholder="Razão social"
                                   {...register("razao_social")}
                            />
                            {errors.razao_social && (
                                <p className={"text-sm text-red-500"}>{errors.razao_social.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Nome fantasia"
                                   {...register("nome_fantasia")}

                            />
                            {errors.nome_fantasia && (
                                <p className={"text-sm text-red-500"}>{errors.nome_fantasia.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="CNPJ"
                                   {...register("cnpj")}
                            />
                            {errors.cnpj && (
                                <p className={"text-sm text-red-500"}>{errors.cnpj.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Inscrição estadual"
                                   {...register("inscricao")}
                            />
                            {errors.inscricao && (
                                <p className={"text-sm text-red-500"}>{errors.inscricao.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Contato
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                        <div>
                            <Input placeholder="Telefone"
                                   {...register("telefone")}
                            />
                            {errors.telefone && (
                                <p className={"text-sm text-red-500"}>{errors.telefone.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="E-mail"
                                   {...register("email")}
                            />
                            {errors.email && (
                                <p className={"text-sm text-red-500"}>{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Contato principal"
                                   {...register("contato_principal")}
                            />
                            {errors.contato_principal && (
                                <p className={"text-sm text-red-500"}>{errors.contato_principal.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="WhatsApp"
                                   {...register("whatsapp")}
                            />
                            {errors.whatsapp && (
                                <p className={"text-sm text-red-500"}>{errors.whatsapp.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Endereço
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="grid gap-4 pt-4 md:grid-cols-3">
                        <div>
                            <Input placeholder="CEP"
                                   {...register("cep")}
                            />
                            {errors.cep && (
                                <p className={"text-sm text-red-500"}>{errors.cep.message}</p>
                            )}

                        </div>
                         <div>
                            <Input
                                placeholder="Rua"
                                className="md:col-span-2"
                                {...register("logradouro")}
                            />
                            {errors.logradouro && (
                                <p className={"text-sm text-red-500"}>{errors.logradouro.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Número"
                                   {...register("numero")}
                            />
                            {errors.numero && (
                                <p className={"text-sm text-red-500"}>{errors.numero.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Bairro"
                                   {...register("bairro")}
                            />
                            {errors.bairro && (
                                <p className={"text-sm text-red-500"}>{errors.bairro.message}</p>
                            )}
                        </div>
                         <div>
                            <Input placeholder="Cidade"
                                   {...register("cidade")}
                            />
                            {errors.cidade && (
                                <p className={"text-sm text-red-500"}>{errors.cidade.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Estado"
                                   {...register("estado")}
                            />
                            {errors.estado && (
                                <p className={"text-sm text-red-500"}>{errors.estado.message}</p>
                            )}

                        </div>

                        <div>
                            <Input
                                placeholder="Complemento"
                                className="md:col-span-3"
                                {...register("complemento")}
                            />
                            {errors.complemento && (
                                <p className={"text-sm text-red-500"}>{errors.complemento.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Dados comerciais
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                        <div>
                            <Input placeholder="Prazo de pagamento (ex: 30 dias)"
                                   {...register("prazo_pagamento")}
                            />
                            {errors.prazo_pagamento && (
                                <p className={"text-sm text-red-500"}>{errors.prazo_pagamento.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Forma de pagamento"
                                   {...register("forma_pagamento")}
                            />
                            {errors.forma_pagamento && (
                                <p className={"text-sm text-red-500"}>{errors.forma_pagamento.message}</p>
                            )}

                        </div>
                        <div>
                            <Input placeholder="Banco"
                                   {...register("banco")}
                            />
                            {errors.banco && (
                                <p className={"text-sm text-red-500"}>{errors.banco.message}</p>
                            )}
                        </div>
                        <div>
                            <Input placeholder="Chave PIX"
                                   {...register("chave_pix")}
                            />
                            {errors.chave_pix && (
                                <p className={"text-sm text-red-500"}>{errors.chave_pix.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Observações
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="pt-4">
                        <div>
                            <Textarea
                                placeholder="Observações importantes sobre o fornecedor"
                                className="min-h-25"
                                {...register("observacoes")}
                            />
                            {errors.observacoes && (
                                <p className={"text-sm text-red-500"}>{errors.observacoes.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">

                    <Button
                        type={"submit"}
                        variant={"outline"}
                    >
                      <PlusCircle className={"text-green-500"}/>Salvar fornecedor
                    </Button>
                </div>
            </form>
        </div>
    );
}

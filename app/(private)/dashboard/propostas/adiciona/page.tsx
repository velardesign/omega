"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";

type Cliente = {
    id: string;
    nome: string;
    telefone?: string;
};

export default function adicionaPropostaPage() {
    const [clienteAtivo, setClienteAtivo] = useState<Cliente | null>(null);
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

            {/* 🔍 TOPO — Busca rápida */}
            <Card>
                <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-center">
                    <Input
                        placeholder="Buscar cliente (nome, telefone ou documento)"
                        className="md:max-w-md"
                    />

                    <div className="flex gap-2">
                        <Button>
                            Selecionar Cliente
                        </Button>
                         <Button variant="outline">
                            Novo cliente
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 🧱 CORPO */}
            <div className="grid flex-1 gap-4 md:grid-cols-[300px_1fr]">

                {/* 👤 CLIENTE ATIVO */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                           {clienteAtivo ? (
                            <div className="space-y-1">
                                <p className="font-medium">
                                    {clienteAtivo.nome}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {clienteAtivo.telefone ?? "Telefone não informado"}
                                </p>
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                Nenhum cliente selecionado
                            </div>
                        )}
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="p-4">

                    </CardContent>
                </Card>

                {/* 📄 ÁREA PRINCIPAL */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>
                            {clienteAtivo
                                ? `Proposta para ${clienteAtivo.nome}`
                                : "Nova proposta"}
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                        {clienteAtivo
                            ? "Aqui entra o fluxo de orçamento / proposta"
                            : "Busque e selecione um cliente para iniciar"}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
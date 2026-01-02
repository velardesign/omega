"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function ClientCreateForm() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

      {/* 🧑 Informações pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Informações pessoais
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <Input placeholder="Nome completo" />
          <Input placeholder="Documento (CPF / CNPJ)" />
        </CardContent>
      </Card>

      {/* 📞 Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Contato
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <Input placeholder="Telefone" />
          <Input placeholder="E-mail" />
        </CardContent>
      </Card>

      {/* 📍 Endereço */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Endereço
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-3">
          <Input placeholder="CEP" />
          <Input placeholder="Cidade" />
          <Input placeholder="Estado" />

          <Input
            placeholder="Rua"
            className="md:col-span-2"
          />
          <Input placeholder="Número" />

          <Input
            placeholder="Complemento"
            className="md:col-span-3"
          />
        </CardContent>
      </Card>

      {/* 📝 Observações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Observações
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="pt-4">
          <Textarea
            placeholder="Observações importantes sobre o cliente"
            className="min-h-25"
          />
        </CardContent>
      </Card>

      {/* ✅ Ações */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Cancelar
        </Button>

        <Button>
          Salvar cliente
        </Button>
      </div>

    </div>
  );
}

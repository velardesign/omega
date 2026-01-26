"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function CompanyProfileForm() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

      {/* 🏢 Identificação da empresa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Identificação da empresa
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <Input placeholder="Razão social" />
          <Input placeholder="Nome fantasia" />
          <Input placeholder="CNPJ" />
          <Input placeholder="Inscrição estadual / municipal" />
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
          <Input placeholder="Telefone principal" />
          <Input placeholder="WhatsApp" />
          <Input placeholder="E-mail comercial" />
          <Input placeholder="Site" />
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

      {/* 💼 Configurações comerciais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Configurações comerciais
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <Input placeholder="Prazo padrão de pagamento" />
          <Input placeholder="Formas de pagamento aceitas" />
          <Input placeholder="Responsável comercial" />
          <Input placeholder="Regime tributário" />
        </CardContent>
      </Card>

      {/* 🎨 Identidade visual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Identidade visual
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <Input type="file" />
          <Textarea
            placeholder="Mensagem padrão em propostas / WhatsApp"
            className="md:col-span-2"
          />
        </CardContent>
      </Card>

      {/* ✅ Ações */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Cancelar
        </Button>

        <Button>
          Salvar empresa
        </Button>
      </div>

    </div>
  );
}

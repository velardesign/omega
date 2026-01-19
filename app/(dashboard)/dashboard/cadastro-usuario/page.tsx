"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  userCreateSchema,
  UserCreateFormData,
} from "@/schemas/user-create-schema";

import{createUserAction}from "@/actions/create-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserCreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserCreateFormData>({
    resolver: zodResolver(userCreateSchema),
  });

  function onSubmit(data: UserCreateFormData) {
    createUserAction(data);
    console.log("Dados validados:", data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-4 p-4 pt-0"
    >
      {/* 👤 Informações do usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Informações do usuário
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <div>
            <Input placeholder="Nome completo" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Usuário (login)" {...register("username")} />
            {errors.username && (
              <p className="text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="CPF" {...register("cpf")} />
            {errors.cpf && (
              <p className="text-sm text-red-500">
                {errors.cpf.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Cargo / Função" {...register("role")} />
            {errors.role && (
              <p className="text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>
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
          <Input placeholder="Telefone" {...register("phone")} />
          <Input placeholder="WhatsApp" {...register("whatsapp")} />

          <div className="md:col-span-2">
            <Input placeholder="E-mail" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔐 Perfil e permissões */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Perfil e permissões
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <div>
            <Select
              onValueChange={(value) =>
                setValue("profile", value as UserCreateFormData["profile"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Perfil de acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="operacional">Operacional</SelectItem>
              </SelectContent>
            </Select>

            {errors.profile && (
              <p className="text-sm text-red-500">
                {errors.profile.message}
              </p>
            )}
          </div>

          <div>
            <Select
              onValueChange={(value) =>
                setValue("status", value as UserCreateFormData["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status do usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>

            {errors.status && (
              <p className="text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔑 Acesso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Acesso ao sistema
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
          <div>
            <Input
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirmar senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
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
            placeholder="Observações sobre o usuário"
            className="min-h-25"
            {...register("notes")}
          />
        </CardContent>
      </Card>

      {/* ✅ Ações */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancelar
        </Button>

        <Button type="submit">
          Salvar usuário
        </Button>
      </div>
    </form>
  );
}

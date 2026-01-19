'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/actions/login-user"

export  function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} action ={loginUser}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Seja Bem Vindo!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entre com seu e-email e senha
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="email@exemplo.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu Sua Senha?
            </a>
          </div>
          <Input id="password" name ="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Luz, Vida e Amor</FieldSeparator>
      
      </FieldGroup>
    </form>
  )
}

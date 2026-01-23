"use client";

import CashAlertDialog from "@/components/cash/cash-alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CashFlowProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CashFlow({ open, onOpenChange }: CashFlowProp) {
  const [sucesso, setSucesso] = useState(false);
  const router = useRouter();

  function closeCash() {
    onOpenChange(false);
    setSucesso(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) return;
          onOpenChange(value);
        }}
      >
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Fechar Caixa</DialogTitle>
          </DialogHeader>
          <div>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldDescription>
                    Usuário: Anderson de Oliveira de Andrade
                  </FieldDescription>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <Input
                    type="password"
                    placeholder="Insira sua senha para continuar..."
                    autoComplete="new-password"
                    inputMode="text"
                    aria-autocomplete="none"
                    required
                  />
                  <FieldDescription>
                    <span className="text-red-500 font-bold mr-1">
                      Aviso importante:
                    </span>{" "}
                    Uma vez confirmada, esta ação não pode ser desfeita.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancela
              </Button>
            </DialogClose>
            <Button type="submit" onClick={closeCash}>
              Fechar Caixa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CashAlertDialog open={sucesso} onOpenChange={setSucesso} />
    </>
  );
}

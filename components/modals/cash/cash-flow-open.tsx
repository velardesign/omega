"use client";

import CashAlertDialog from "@/components/cash/cash-alert-dialog";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
    Field, FieldDescription, FieldGroup, FieldSet
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useUsuarioLogado} from "@/hooks/use-usuario-logado";
import {useCashFlowOpen} from "@/hooks/use-cash-flow-open";


const REDIRECT_DELAY_MS = 3000;

interface CashFlowProp {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CashFlowOpen({open, onOpenChange}: CashFlowProp) {
    const usuario = useUsuarioLogado();
    const router = useRouter();

    const { executar, loading, sucesso, erro, reset } = useCashFlowOpen();

    const [password, setPassword] = useState("");

     useEffect(() => {
        if (!erro) return;

        const t = setTimeout(() => {
            reset();
            onOpenChange(true);
            setPassword("");
        }, 2000);

        return () => clearTimeout(t);
    }, [erro]);

    useEffect(() => {
        if (sucesso) {
            setTimeout(() => router.push("/dashboard"), REDIRECT_DELAY_MS);
        }
    }, [sucesso]);

    const handleSubmit = () => {
        if (!usuario || !password) return;

        void executar(usuario.email, password, usuario.nome);
        onOpenChange(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>Abrir Caixa</DialogTitle>
                    </DialogHeader>

                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldDescription>
                                    Usuário: {usuario?.nome}
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                        <FieldGroup>
                            <Field>
                                <Input
                                    type="password"
                                    placeholder="Insira sua senha para continuar..."
                                    disabled={loading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <FieldDescription>
                                    <span className="text-red-500 font-bold mr-1">
                                        Aviso importante:
                                    </span>
                                    Uma vez confirmada, esta ação não pode ser desfeita.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                disabled={loading}
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleSubmit}
                            disabled={!password || loading}
                        >
                            {loading ? "Processando..." : "Abrir Caixa"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CashAlertDialog
                open={sucesso}
                onOpenChange={() => {}}
                titulo="O caixa foi aberto com sucesso."
                mensagem="Você será redirecionado para o Dashboard em alguns segundos."
            />

            <CashAlertDialog
                open={erro}
                onOpenChange={() => {}}
                titulo="Erro de Autenticação"
                mensagem="A senha informada está incorreta. Verifique os dados e tente novamente."
            />
        </>
    );
}

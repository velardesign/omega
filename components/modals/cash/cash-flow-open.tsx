"use client";

import CashAlertDialog from "@/components/cash/cash-alert-dialog";
import {Button} from "@/components/ui/button";
import {Dialog, DialogFooter, DialogHeader} from "@/components/ui/dialog";
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
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {abrirCaixaAction} from "@/actions/caixa-action";

const REDIRECT_DELAY_MS = 3000;
const ERROR_DISPLAY_DELAY_MS = 3000;

interface CashFlowProp {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface UseData {
    nome: string;
    email: string;
}

interface DialogState {
    isLoading: boolean;
    sucessoAberto: boolean;
    falhaAberto: boolean;
}

export default function CashFlowOpen({open, onOpenChange}: CashFlowProp) {
    const [userData, setUserData] = useState<UseData>({nome: "", email: ""});
    const [password, setPassword] = useState("");
    const [dialogState, setDialogState] = useState<DialogState>({
        isLoading: false,
        sucessoAberto: false,
        falhaAberto: false
    });

    const router = useRouter();

    useEffect(() => {

        const loadUserData = async () => {
            try {
                const session = await authClient.getSession();
                setUserData({
                    nome: session?.data?.user?.name || "",
                    email: session?.data?.user?.email || ""
                });
            } catch (error) {
                console.error("Erro ao Carregar dados do usuário:", error)
            }
        };

        if (open) {
            loadUserData();
        }
    }, [open])

    useEffect(() => {
        if (!open) {
            setPassword("");
            setDialogState({
                isLoading: false,
                sucessoAberto: false,
                falhaAberto: false
            });

        }
    }, [open]);

    const isPasswordValid = useCallback((): boolean => {
        return password.trim().length > 0;
    }, [password])

    const closeCash = useCallback(async () => {
        if (!isPasswordValid) {
            return;
        }

        setDialogState((prev) => ({...prev, isLoading: false}));
        onOpenChange(false);

        try {
          authClient.signIn.email({
                    email: userData.email,
                    password
                },
                {
                    onSuccess: async () => {
                        try {

                            await abrirCaixaAction({
                                valor:userData.email,
                                responsavel:userData.nome
                            });


                            setDialogState(
                                (prev) => ({...prev, sucessoAberto: true})
                            );
                            setTimeout(() => {
                                router.push("/dashboard");
                            }, REDIRECT_DELAY_MS);

                        } catch (error) {

                            console.error("Erro ao abrir o caixa:", error);
                            setDialogState((prev) => ({
                                ...prev,
                                falhaAberto: true,
                                isLoading: false
                            }));
                            setTimeout(() => {
                                setDialogState((prev) => ({...prev, falhaAberto: false}));
                                onOpenChange(true);
                            }, ERROR_DISPLAY_DELAY_MS);

                        }

                    },
                    onError(error) {
                        console.error("Error de autenticação:", error);
                        setDialogState((prev) => ({...prev, falhaAberto: true, isLoading: false}));
                        setTimeout(() => {
                            setDialogState((prev) => ({...prev, falhaAberto: false}))
                            onOpenChange(true);
                        }, ERROR_DISPLAY_DELAY_MS);
                    }
                })
        } catch (error) {
            console.error("Erro inesperado:", error);
            setDialogState((prev) => ({...prev, falhaAberto: true, isLoading: false}))
            onOpenChange(true);
        }
    }, [password, userData.email, isPasswordValid, onOpenChange, router]);

    const handleSubmit = useCallback(() => {
        closeCash();
    }, [closeCash])

    const handlePasswordCharge = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        }, []);

    const handleDialogOpenChange = useCallback((value: boolean) => {
        if (value && !dialogState.isLoading) {
            onOpenChange(value);
        }
    }, [onOpenChange, dialogState.isLoading]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && isPasswordValid() && !dialogState.isLoading) {
                e.preventDefault();
                handleSubmit();
            }
        }, [isPasswordValid, dialogState.isLoading, handleSubmit]);

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
                        <DialogTitle>Abrir Caixa</DialogTitle>
                    </DialogHeader>
                    <div>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldDescription>
                                        Usuário: {userData.nome}
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                            <FieldGroup>
                                <Field>
                                    <Input
                                        type="password"
                                        placeholder="Insira sua senha para continuar..."
                                        autoComplete="new-password"
                                        disabled={dialogState.isLoading}
                                        inputMode="text"
                                        aria-autocomplete="none"
                                        required
                                        id={"password"}
                                        name={"password"}
                                        onChange={handlePasswordCharge}
                                        onKeyDown={handleKeyDown}
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
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={dialogState.isLoading}
                            >
                                Cancela
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isPasswordValid() || dialogState.isLoading}
                            aria-busy={dialogState.isLoading}
                        >
                            {dialogState.isLoading ? "Processando..." : "Abrir Caixa"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <CashAlertDialog
                open={dialogState.sucessoAberto}
                onOpenChange={
                    (value) => setDialogState((prev) => ({...prev, sucessoAberto: value}))
                }
                titulo="O caixa foi aberto com sucesso."
                mensagem="Você será redirecionado para o Dashboard em alguns segundos."
            />
            <CashAlertDialog
                open={dialogState.falhaAberto}
                onOpenChange={
                    (value)=> setDialogState((prev) => ({...prev, falhaAberto:value}))
                }
                titulo="Erro de Autenticação"
                mensagem="A senha informada está incorreta. Verifique os dados e tente novamente."
            />
        </>
    );
}

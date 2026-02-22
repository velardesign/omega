"use client"
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Field, FieldDescription, FieldGroup, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {addEntrada} from "@/actions/caixa-action";
import {EntradaDTO} from "@/src/domain/types/caixa-types";
import {TipoEntrada} from "@/generated/prisma/enums";
import CashAlertDialog from "@/components/cash/cash-alert-dialog";


interface DialogAddEntradaProps {
    usuario: {
        nome: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DialogAddEntrada({usuario, open, onOpenChange}: DialogAddEntradaProps) {

    const [valor, setValor] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErro, setOpenAlertErro] = useState(false);


    const convertStringEnum = (str: string): TipoEntrada | undefined => {
        if (str.toUpperCase() === "PIX") return TipoEntrada.PIX;
        if (str.toUpperCase() === "DINHEIRO") return TipoEntrada.DINHEIRO;
        if (str.toUpperCase() === "CARTÂO") return TipoEntrada.CARTAO;
        if (str.toUpperCase() === "TRANSFERÊNCIA") return TipoEntrada.TRANSFERENCIA;
        return undefined;
    }

    const handleSubmit = () => {
        if (valor === "" || !usuario) return;

        const entrada: EntradaDTO = {
            valor: Number(valor.replaceAll(",",".")),
            tipo: convertStringEnum(tipo)!,
            responsavel: usuario.nome,
        }
        addEntrada(entrada)
            .then(() => {
                onOpenChange(false);
                setOpenAlert(true);
                setOpenAlertErro(false);
                setTimeout(() => {
                    setOpenAlert(false);
                    onOpenChange(true);
                }, 1500);
            })
            .catch((error) => {
                onOpenChange(false);
                setOpenAlert(false);
                setOpenAlertErro(true);
                console.error(error);
                setTimeout(() => {
                    setOpenAlertErro(false);
                }, 3000);
            });

    };
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>Adicionar Entrada</DialogTitle>
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
                                    type="text"
                                    placeholder="Tipo da Entrada"
                                    onChange={(e) => setTipo(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <Input
                                    type="text"
                                    placeholder="Valor da Entrada"
                                    onChange={(e) => setValor(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <FieldDescription>
                                    <span className="text-red-500 font-bold mr-1">
                                        Aviso importante:
                                    </span>
                                    Utilize para entradas rapidas no caixa.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleSubmit}
                        >
                            Adicionar Entrada
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <CashAlertDialog
                open={openAlert}
                onOpenChange={setOpenAlert}
                titulo={"Sucesso"}
                mensagem={"Entrada Adicionada Com Sucesso!"}
            />
            <CashAlertDialog
                open={openAlertErro}
                onOpenChange={setOpenAlertErro}
                titulo={"Erro"}
                mensagem={"Erro ao Adicionar Entrada!"}
            />
        </>
    );
}

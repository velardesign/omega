import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Field, FieldDescription, FieldGroup, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {addSaida} from "@/actions/caixa-action";
import {SaidaDTO} from "@/src/domain/types/caixa-types";
import {TipoEntrada} from "@/generated/prisma/enums";
import CashAlertDialog from "@/components/cash/cash-alert-dialog";


interface DialogAddSaidaProps {
    usuario: {
        nome: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DialogAddSaida({usuario, open, onOpenChange}: DialogAddSaidaProps) {

    const [valor, setValor] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErro, setOpenAlertErro] = useState(false);

    const handleSubmit = () => {
        if (valor === "" || !usuario) return;

        const saida: SaidaDTO = {
            valor: Number(valor.replaceAll(",",".")),
            tipo: tipo,
            responsavel: usuario.nome,
        }
        addSaida(saida)
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
                        <DialogTitle>Adicionar Saida</DialogTitle>
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
                                    placeholder="Tipo da Saida"
                                    onChange={(e) => setTipo(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <Input
                                    type="text"
                                    placeholder="Valor da Saida"
                                    onChange={(e) => setValor(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <FieldDescription>
                                    <span className="text-red-500 font-bold mr-1">
                                        Aviso importante:
                                    </span>
                                    Utilize para saidas rapidas no caixa.
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
                            Adicionar Saida
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <CashAlertDialog
                open={openAlert}
                onOpenChange={setOpenAlert}
                titulo={"Sucesso"}
                mensagem={"Saida Adicionada Com Sucesso!"}
            />
            <CashAlertDialog
                open={openAlertErro}
                onOpenChange={setOpenAlertErro}
                titulo={"Erro"}
                mensagem={"Erro ao Adicionar Saida!"}
            />
        </>
    );
}

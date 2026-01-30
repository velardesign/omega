import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

interface CashAlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    titulo: string;
    mensagem: string;
}

export default function CashAlertDialog({
                                            open,
                                            onOpenChange,
                                            titulo,
                                            mensagem
                                        }: CashAlertDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {titulo}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {mensagem}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

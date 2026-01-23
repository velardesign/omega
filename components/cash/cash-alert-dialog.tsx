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
}

export default function CashAlertDialog({
  open,
  onOpenChange,
}: CashAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Fechamento de caixa realizado com sucesso.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Redirecionando para o dashboard…
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

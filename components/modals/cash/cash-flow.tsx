import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface CashFlowProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CashFlow({ open, onOpenChange }: CashFlowProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abrir Caixa</DialogTitle>
        </DialogHeader>
        <form></form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancela</Button>
          </DialogClose>
          <Button type="submit">Abrir Caixa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

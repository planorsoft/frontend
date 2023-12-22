import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "@/containers/Calendar/actions";
import { deleteCustomer } from "@/containers/Customer/actions";
import { deleteDuty, deleteDutyCategory } from "@/containers/Duty/actions";
import { deleteProject } from "@/containers/Project/actions";
import { deleteCurrency } from "@/containers/Settings/Currency/actions";
import { useAppDispatch } from "@/store";
import { Dispatch, SetStateAction } from "react";

interface RemoveProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
  entity: "customer" | "project" | "duty" | "dutyCategory" | "currency" | "event";
  entityId: number;
  onDeleted: () => void;
}

const Remove = ({
  open,
  setOpen,
  entity,
  entityId,
  onDeleted
}: RemoveProps) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    switch (entity) {
      case "customer":
        dispatch(deleteCustomer(entityId));
        break;
      case "project":
        dispatch(deleteProject(entityId));
        break;
      case "duty":
        dispatch(deleteDuty(entityId));
        break;
      case "dutyCategory":
        dispatch(deleteDutyCategory(entityId));
        break;
      case "currency":
        dispatch(deleteCurrency(entityId));
        break;
      case "event":
        dispatch(deleteEvent(entityId));
        break;
      default:
        console.error("Entity geçersiz");
        break;
    }
    onDeleted();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emin misin?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Bu, veri kalıcı olarak silecektir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
            }}
          >
            İptal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              remove();
            }}
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Remove;

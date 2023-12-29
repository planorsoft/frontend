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
import { deleteUser } from "@/containers/Settings/Team/actions";
import { useAppDispatch } from "@/store";
import { Dispatch, SetStateAction } from "react";

interface RemoveProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
  entity:
    | "customer"
    | "project"
    | "duty"
    | "dutyCategory"
    | "currency"
    | "event"
    | "user";
  entityId?: number;
  entityIdString?: string;
  onDeleted: () => void;
}

const Remove = ({
  open,
  setOpen,
  entity,
  entityId,
  entityIdString,
  onDeleted,
}: RemoveProps) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    switch (entity) {
      case "customer":
        if (entityId === undefined) return;
        dispatch(deleteCustomer(entityId));
        break;
      case "project":
        if (entityId === undefined) return;
        dispatch(deleteProject(entityId));
        break;
      case "duty":
        if (entityId === undefined) return;
        dispatch(deleteDuty(entityId));
        break;
      case "dutyCategory":
        if (entityId === undefined) return;
        dispatch(deleteDutyCategory(entityId));
        break;
      case "currency":
        if (entityId === undefined) return;
        dispatch(deleteCurrency(entityId));
        break;
      case "event":
        if (entityId === undefined) return;
        dispatch(deleteEvent(entityId));
        break;
      case "user":
        if (entityIdString === undefined) return;
        dispatch(deleteUser(entityIdString));
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

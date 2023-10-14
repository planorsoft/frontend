import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDuty, deleteDutyCategory } from "@/containers/Duty/actions";
import { useAppDispatch } from "@/store";
import { Dispatch, SetStateAction } from "react";


interface RemoveProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
  entity: "duty" | "dutyCategory";
  entityId: number
}

const Remove = ({ open, setOpen, entity, entityId } : RemoveProps) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    switch (entity) {
      case "duty":
        dispatch(deleteDuty(entityId));
        break;
      case "dutyCategory":
        dispatch(deleteDutyCategory(entityId))
        break;
      default:
        console.error("Entity geçersiz")
        break;
    }
  }

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
          <AlertDialogCancel onClick={() => { setOpen(false) }}>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={() => { remove() }}>Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Remove;

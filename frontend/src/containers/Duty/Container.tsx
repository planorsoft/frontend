import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { getActiveDuties, getDutyCategories } from "./actions";
import { DutyState } from "./types";
import Loader from "@/components/ui/loader";
import Kanban from "./Kanban";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UpsertDuty from "./UpsertDuty";


const Container = () => {
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>(state => state.dutyState);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    dispatch(getActiveDuties());
    dispatch(getDutyCategories());
  }, []);

  const renderBody = () => {
    if (dutyState.loading) {
      return (
        <Loader />
      )
    } else {
      if (dutyState.duties.length > 0 && dutyState.dutyCategories.length > 0) {
        return (
          <Kanban />
        )
      }
    }
  }

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  }

  return (
    <div>
       <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">Görevler</h2>
          <Button onClick={openUpsert}>
            <Plus size={16} /> Yeni Görev
          </Button>
      </div>
      <div>
        {renderBody()}
      </div>
      <UpsertDuty 
        open={open} 
        setOpen={setOpen} 
        dutyId={id}
      />
    </div>
  )
}

export default Container
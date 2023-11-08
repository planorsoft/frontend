import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { getActiveDuties, getDutyCategories, getDutySizes } from "./actions";
import { DutyCategoryState, DutyState } from "./types";
import Kanban from "./Kanban";
import { Button } from "@/components/ui/button";
import { CircleSlash, Plus } from "lucide-react";
import UpsertDuty from "./UpsertDuty";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import UpsertDutyCategory from "./UpsertDutyCategory";
import useTitle from "@/hooks/use-title";

const Container = () => {
  useTitle("Görevler");
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const [isOpenUpsertDuty, setIsOpenUpsertDuty] = useState<boolean>(false);
  const [dutyId, setDutyId] = useState<number>(0);
  const [isOpenUpsertDutyCategory, setIsOpenUpsertDutyCategory] =
    useState<boolean>(false);
  const [dutyCategoryId, setDutyCategoryId] = useState<number>(0);
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(getActiveDuties(Number(projectId)));
    dispatch(getDutyCategories());
    dispatch(getDutySizes());
  }, []);

  const openUpsertDuty = (id: number = 0) => {
    setDutyId(id);
    setIsOpenUpsertDuty(true);
  };

  const openUpsertDutyCategory = (id: number = 0) => {
    setDutyCategoryId(id);
    setIsOpenUpsertDutyCategory(true);
  };

  useEffect(() => {
    if (dutyState.error) {
      toast({
        title: "Hata oluştu",
        description: dutyState.error,
        variant: "destructive",
      });
    }
  }, [dutyState.error]);

  useEffect(() => {
    if (dutyCategoryState.error) {
      toast({
        title: "Hata oluştu",
        description: dutyCategoryState.error,
        variant: "destructive",
      });
    }
  }, [dutyCategoryState.error]);

  const renderBody = () => {
    if (dutyState.loading || dutyCategoryState.loading) {
      return <div></div>;
    } else {
      if (
        dutyState.duties.length > 0 &&
        dutyCategoryState.dutyCategories.length > 0
      ) {
        return (
          <Kanban
            openUpsertDuty={openUpsertDuty}
            openUpsertDutyCategory={openUpsertDutyCategory}
            projectId={projectId}
          />
        );
      } else {
        return (
          <Alert>
            <CircleSlash className="h-4 w-4" />
            <AlertTitle>Görev bulunamadı!</AlertTitle>
            <AlertDescription>
              Yukarıdaki butondan ilk görevini oluşturabilirsin
            </AlertDescription>
          </Alert>
        );
      }
    }
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">Görevler</h2>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              openUpsertDutyCategory(0);
            }}
            variant="outline"
          >
            <Plus size={16} /> Kategori
          </Button>
          <Button
            onClick={() => {
              openUpsertDuty(0);
            }}
          >
            <Plus size={16} /> Görev
          </Button>
        </div>
      </div>
      <div>{renderBody()}</div>
      <UpsertDuty
        open={isOpenUpsertDuty}
        setOpen={setIsOpenUpsertDuty}
        dutyId={dutyId}
        projectId={projectId}
      />
      {isOpenUpsertDutyCategory && (
        <UpsertDutyCategory
          open={isOpenUpsertDutyCategory}
          setOpen={setIsOpenUpsertDutyCategory}
          dutyCategoryId={dutyCategoryId}
        />
      )}
    </div>
  );
};

export default Container;

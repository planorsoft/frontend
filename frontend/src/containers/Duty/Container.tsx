import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { getActiveDuties, getDutyCategories, getDutySizes } from "./actions";
import { DutyCategoryState, DutySizeState, DutyState } from "./types";
import Kanban from "./Kanban";
import { Button } from "@/components/ui/button";
import { CircleSlash, Plus } from "lucide-react";
import UpsertDuty from "./UpsertDuty";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import UpsertDutyCategory from "./UpsertDutyCategory";
import useTitle from "@/hooks/use-title";
import { ProjectState } from "../Project/types";
import { getProject } from "../Project/actions";
import { useTranslation } from "react-i18next";

const Container = () => {
  const { t } = useTranslation();
  useTitle("Görevler");
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const dutySizeState = useAppSelector<DutySizeState>(state => state.dutySizeState);
  const projectState = useAppSelector<ProjectState>((state) => state.projectState);
  const [isOpenUpsertDuty, setIsOpenUpsertDuty] = useState<boolean>(false);
  const [dutyId, setDutyId] = useState<number>(0);
  const [isOpenUpsertDutyCategory, setIsOpenUpsertDutyCategory] = useState<boolean>(false);
  const [dutyCategoryId, setDutyCategoryId] = useState<number>(0);
  const projectId = Number(useParams().projectId) || null;
  const project = projectState.project;


  useEffect(() => {
    if (dutyCategoryState.dutyCategories.length === 0) {
      dispatch(getDutyCategories());
    }
    if (dutySizeState.dutySizes.length === 0) {
      dispatch(getDutySizes());
    }
    dispatch(getActiveDuties(Number(projectId)));
  }, []);

  useEffect(() => {
    if (projectId === null) return;
    if (!project) {
      dispatch(getProject(projectId));
    } else if (project.id !== projectId) {
      dispatch(getProject(projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

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
            projectId={projectId || 0}
          />
        );
      } else {
        return (
          <Alert>
            <CircleSlash className="h-4 w-4" />
            <AlertTitle>{t("task.not-found")}</AlertTitle>
            <AlertDescription>
            {t("task.not-found-description")}
            </AlertDescription>
          </Alert>
        );
      }
    }
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <div>
          <h2 className="text-2xl font-semibold">
            {project ? `${project.title} için Görevler` : `${t("task.title")}`}
          </h2>
          <p className="leading-7 my-2 dark:text-gray-500 text-gray-600">
          {t("task.description")}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              openUpsertDutyCategory(0);
            }}
            variant="outline"
          >
            <Plus size={16} /> {t("task.model.category")}
          </Button>
          <Button
            onClick={() => {
              openUpsertDuty(0);
            }}
          >
            <Plus size={16} /> {t("task.model.task")}
          </Button>
        </div>
      </div>
      <div className="shadow">{renderBody()}</div>
      {isOpenUpsertDuty && (
        <UpsertDuty
          open={isOpenUpsertDuty}
          setOpen={setIsOpenUpsertDuty}
          dutyId={dutyId}
          projectId={projectId}
        />
      )}
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

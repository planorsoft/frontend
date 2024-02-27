import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store";
import { CircleSlash, Info, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Duty, DutyCategoryState, DutySizeState, DutyState } from "./types";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDuty, getDutySizes } from "./actions";
import Loader from "@/components/ui/loader";
import { selectDutyCategoryById, selectDutySizeById } from "./selector";
import { selectProjectById } from "../Project/selector";
import { getProject } from "../Project/actions";
import { ProjectState } from "../Project/types";

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dutyId: number;
}

const Detail = ({ open, setOpen, setUpsertOpen, dutyId }: DetailProps) => {
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const duty = dutyState.duty;
  const loading = dutyState.loading;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDuty(dutyId));
  }, [dutyId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        {loading ? (
          <Loader />
        ) : duty?.id ? (
          <DialogHeader className="text-left space-y-4">
            <DialogTitle className="flex items-center space-x-4 pb-3">
              <p className="font-semibold leading-none tracking-tight">
                {duty?.title}
              </p>
            </DialogTitle>

            {duty?.description && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("project.model.description")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {duty?.description}
                  </p>
                </div>
              </div>
            )}

            {duty?.assignedTo && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("task.assignedTo")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {duty?.assignedTo}
                  </p>
                </div>
              </div>
            )}

            {duty?.categoryId && <DutyCategoryCard duty={duty} />}

            {duty?.sizeId && <DutySizeCard duty={duty} />}

            {duty?.projectId && <ProjectCard duty={duty} />}

            {duty?.helpers?.length != undefined &&
              duty?.helpers?.length > 0 && (
                <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                  <Info className="w-6 h-6 mt-px" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium leading-none">
                      {t("task.helpers")}:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {duty?.helpers.map((helper) => helper).join(", ")}
                    </p>
                  </div>
                </div>
              )}

            <div className="flex justify-end">
              <Button
                variant="default"
                className="col-span-2"
                onClick={() => {
                  setUpsertOpen(true);
                  setOpen(false);
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
        ) : (
          <Alert>
            <CircleSlash className="h-4 w-4" />
            <AlertTitle>{t("duty.not-found")}</AlertTitle>
            <AlertDescription>
              {t("duty.not-found-description")}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

const DutyCategoryCard = ({ duty }: { duty: Duty }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const dutyCategory = selectDutyCategoryById(
    dutyCategoryState,
    duty?.categoryId
  );

  useEffect(() => {
    if (!dutyCategory) {
      dispatch(getDutySizes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duty?.categoryId]);

  return (
    <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
      <Info className="w-6 h-6 mt-px" />
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none">
          {t("finance.model.category")}:
        </p>
        <p className="text-sm text-muted-foreground">{dutyCategory?.title}</p>
      </div>
    </div>
  );
};

const DutySizeCard = ({ duty }: { duty: Duty }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dutySizeState = useAppSelector<DutySizeState>(
    (state) => state.dutySizeState
  );
  const dutySize = selectDutySizeById(dutySizeState, duty?.sizeId);

  useEffect(() => {
    if (!dutySize) {
      dispatch(getDutySizes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duty?.sizeId]);

  return (
    <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
      <Info className="w-6 h-6 mt-px" />
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none">{t("task.size")}:</p>
        <p className="text-sm text-muted-foreground">{dutySize?.name}</p>
      </div>
    </div>
  );
};

const ProjectCard = ({ duty }: { duty: Duty }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const projectState = useAppSelector<ProjectState>((state) => state.projectState);
  const project = projectState.project;

  useEffect(() => {
    if (!project && project) {
      dispatch(getProject(duty?.projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duty?.projectId]);

  return (
    <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
      <Info className="w-6 h-6 mt-px" />
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none">
          {t("project.title")}:
        </p>
        <p className="text-sm text-muted-foreground">{project?.title}</p>
      </div>
    </div>
  );
};

export default Detail;

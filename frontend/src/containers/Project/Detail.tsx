import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store";
import { CircleSlash, DollarSign, Info, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ProjectState } from "./types";
import { selectProjectById } from "./selector";

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

const Detail = ({ open, setOpen, setUpsertOpen, projectId }: DetailProps) => {
  const projectState = useAppSelector<ProjectState>(
    (state) => state.projectState
  );
  const project = selectProjectById(projectState, projectId);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        {project?.id ? (
          <DialogHeader className="text-left space-y-4">
            <DialogTitle className="flex items-center space-x-4 pb-3">
              <p className="font-semibold leading-none tracking-tight">
                {project?.title}
              </p>
            </DialogTitle>

            {project?.description && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("project.description")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {project?.description}
                  </p>
                </div>
              </div>
            )}

            {project?.price && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <DollarSign className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("project.price")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {project?.price}
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
            <AlertTitle>{t("project.not-found")}</AlertTitle>
            <AlertDescription>
              {t("project.not-found-description")}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Detail;

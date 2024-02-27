import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  Dialog,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { LoaderIcon, Trash2 } from "lucide-react";
import Remove from "@/components/remove";
import { InputServerSelect } from "@/components/ui/input-server-select";
import { useAppDispatch, useAppSelector } from "@/store";
import { ProjectState, projectTypes } from "./types";
import {
  createProject,
  getProject,
  resetProjectStatus,
  updateProject,
} from "./actions";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  id: z.number(),
  title: z.string().nonempty({ message: "Please enter a valid title" }),
  description: z.string(),
  isCompleted: z.boolean(),
  customerId: z
    .string()
    .nonempty({ message: "Please select a valid customer" }),
  price: z.string(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId?: number;
}

const Upsert = ({ open, setOpen, projectId }: UpsertProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const projectState = useAppSelector<ProjectState>(
    (state) => state.projectState
  );
  const loading = projectState.loading;
  const project = projectState.project;
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      isCompleted: false,
      customerId: "",
      price: "0",
    },
  });

  useEffect(() => {
    if (projectId === 0) {
      form.reset();
      return;
    }
    dispatch(getProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (project && projectId !== 0) {
      form.setValue("id", project.id || 0);
      form.setValue("title", project.title || "");
      form.setValue("description", project.description || "");
      form.setValue("isCompleted", project.isCompleted || false);
      form.setValue("customerId", project.customerId.toString() || "");
      form.setValue("price", project.price.toString() || "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      ...values,
      price: Number(values.price),
      customerId: Number(values.customerId),
    };
    if (values.id == 0) {
      dispatch(createProject(request));
    } else {
      dispatch(updateProject(projectId, request));
    }
  };

  useEffect(() => {
    switch (projectState.status) {
      case projectTypes.UPDATE_PROJECT_FAILURE ||
        projectTypes.CREATE_PROJECT_FAILURE ||
        null:
        toast({
          title: "An error occurred",
          description: projectState.error,
          variant: "destructive",
        });
        break;
      case projectTypes.UPDATE_PROJECT_SUCCESS:
        toast({
          title: "Project updated",
        });
        setOpen(false);
        dispatch(resetProjectStatus());
        break;
      case projectTypes.CREATE_PROJECT_SUCCESS:
        toast({
          title: "Project created",
        });
        setOpen(false);
        dispatch(resetProjectStatus());
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectState.status]);

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-screen m-2 md:w-6/12">
          <DialogHeader>
            <DialogTitle>
              {projectId === 0
                ? `${t("project.create")}`
                : `${t("project.update")}`}
            </DialogTitle>
            {loading ? (
              <Loader />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <InputString
                    control={form.control}
                    placeholder={t("project.model.title")}
                    fieldName="title"
                  />
                  <InputString
                    control={form.control}
                    placeholder={t("project.model.description")}
                    fieldName="description"
                  />
                  <InputBoolean
                    control={form.control}
                    placeholder={t("project.model.isItComp")}
                    fieldName="isCompleted"
                  />
                  <InputServerSelect
                    control={form.control}
                    placeholder={t("project.model.customer")}
                    fieldName="customerId"
                    entity="customer"
                  />
                  <InputString
                    control={form.control}
                    placeholder={t("project.model.price")}
                    fieldName="price"
                  />
                  {projectId === 0 ? (
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {t("common.submit")}
                    </Button>
                  ) : (
                    <div className="grid grid-cols-12 gap-2">
                      <Button
                        disabled={loading}
                        type="submit"
                        className="col-span-10"
                      >
                        {loading && (
                          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t("common.submit")}
                      </Button>
                      <Button
                        disabled={loading}
                        onClick={() => {
                          setRemove(true);
                        }}
                        variant="destructive"
                        className="col-span-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="project"
        entityId={projectId}
        onDeleted={onDeleted}
      />
    </>
  );
};

export default Upsert;

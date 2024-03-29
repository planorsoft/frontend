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
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { LoaderIcon, Trash2 } from "lucide-react";
import { createDuty, getDuty, updateDuty } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { DutyCategoryState, DutySizeState, DutyState } from "./types";
import { InputSelect } from "@/components/ui/input-select";
import { InputServerSelect } from "@/components/ui/input-server-select";
import Remove from "@/components/remove";
import { ApplicationState } from "../Settings/Application/types";
import InputTextarea from "@/components/ui/input-textarea";
import { selectDefaultDutyCategory } from "./selector";
import { useTranslation } from "react-i18next";
import { User } from "../Settings/Team/types";
import { InputServerMultiSelect } from "@/components/ui/input-server-multiselect";

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty({
    message: "Lütfen geçerli bir başlık giriniz.",
  }),
  description: z.string().optional(),
  projectId: z
    .string()
    .min(1, {
      message: "Lütfen geçerli bir proje giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir proje giriniz.",
    }),
  categoryId: z
    .string()
    .min(1, {
      message: "Lütfen geçerli bir kategori giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir kategori giriniz.",
    }),
  sizeId: z
    .string()
    .min(1, {
      message: "Lütfen geçerli bir büyüklük giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir büyüklük giriniz.",
    }),
  assignedTo: z.string().optional(),
  helpers: z.array(z.string()).optional(),
});

interface UpsertDutyProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dutyId: number;
  projectId: number | null;
}

const UpsertDuty = ({ open, setOpen, dutyId, projectId }: UpsertDutyProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const loading = dutyState.loading;
  const error = dutyState.error;
  const duty = dutyState.duty;
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const dutyCategories = dutyCategoryState.dutyCategories;
  const defaultDutyCategory = selectDefaultDutyCategory(dutyCategoryState);
  const dutySizeState = useAppSelector<DutySizeState>(
    (state) => state.dutySizeState
  );
  const dutySizes = dutySizeState.dutySizes;
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      title: "",
      description: "",
      projectId: projectId?.toString(),
      categoryId: "",
      sizeId: "",
      assignedTo: "",
      helpers: [],
    },
  });

  useEffect(() => {
    if (dutyId != 0 && open) {
      dispatch(getDuty(dutyId));
    } else {
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Hata oluştu",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  useEffect(() => {
    if (duty.id && dutyId != 0) {
      form.setValue("id", duty.id || 0);
      form.setValue("title", duty.title || "");
      form.setValue("description", duty.description || "");
      form.setValue("categoryId", duty.categoryId?.toString() || "");
      form.setValue("projectId", duty.projectId?.toString() || "");
      form.setValue("sizeId", duty.sizeId?.toString() || "");
      form.setValue("assignedTo", duty.assignedTo || "");
      form.setValue(
        "helpers",
        duty.helpers?.map((attendee: User) => attendee.email) || []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duty]);

  useEffect(() => {
    if (form.getValues().categoryId === "" && defaultDutyCategory?.id) {
      form.setValue("categoryId", defaultDutyCategory.id.toString());
    }
  }, [defaultDutyCategory]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      id: values.id || 0,
      title: values.title,
      description: values.description,
      categoryId: parseInt(values.categoryId),
      projectId: parseInt(values.projectId),
      sizeId: parseInt(values.sizeId),
      assignedTo: values.assignedTo,
      helpers: values.helpers,
    };

    if (values.id) {
      dispatch(updateDuty(values.id, request));
    } else {
      dispatch(createDuty(request));
    }
    setOpen(false);
  };

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-start">
              {dutyId === 0 ? (
                t("task.create")
              ) : applicationState.application?.code ? (
                <p>
                  {applicationState.application?.code}-{dutyId}, {" "}
                  {t("task.edit")}
                </p>
              ) : (
                t("task.edit")
              )}
            </div>
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
                  placeholder={t("project.title")}
                  fieldName="title"
                />
                <InputTextarea
                  control={form.control}
                  placeholder={t("project.model.description")}
                  fieldName="description"
                />
                <InputSelect
                  control={form.control}
                  placeholder={t("finance.model.category")}
                  fieldName="categoryId"
                  selectList={dutyCategories.map((x) => ({
                    value: x.id?.toString(),
                    label: x.title,
                  }))}
                />
                <InputSelect
                  control={form.control}
                  placeholder={t("task.size")}
                  fieldName="sizeId"
                  selectList={dutySizes.map((x) => ({
                    value: x.id.toString(),
                    label: x.name,
                  }))}
                />
                <InputServerSelect
                  control={form.control}
                  disabled={projectId !== 0 && projectId !== null}
                  placeholder={t("task.project")}
                  fieldName="projectId"
                  entity="project"
                />
                <InputServerSelect
                  control={form.control}
                  placeholder={t("task.assignedTo")}
                  fieldName="assignedTo"
                  entity="user"
                />
                <InputServerMultiSelect
                  control={form.control}
                  placeholder={t("task.helpers")}
                  fieldName="helpers"
                  entity="user"
                />
                {dutyId === 0 ? (
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
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="duty"
        entityId={dutyId}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
};

export default UpsertDuty;

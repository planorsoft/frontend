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
import { createDuty, getDuty, updateDuty } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { DutyCategoryState, DutyState } from "./types";
import { InputSelect } from "@/components/ui/input-select";
import { InputServerSelect } from "@/components/ui/input-server-select";
import Remove from "@/components/remove";
import InputMarkdown from "@/components/ui/input-markdown";

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty({
    message: "Lütfen geçerli bir başlık giriniz.",
  }),
  description: z.string().nonempty({
    message: "Lütfen geçerli bir açıklama giriniz.",
  }),
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
  // priorityId: z.number().int().optional(),
  // sizeId: z.number().int().optional(),
  hasTodos: z.boolean(),
});

interface UpsertDutyProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dutyId: number;
  projectId?: string;
}

const UpsertDuty = ({ open, setOpen, dutyId, projectId }: UpsertDutyProps) => {
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const loading = dutyState.loading;
  const error = dutyState.error;
  const duty = dutyState.duty;
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const dutyCategories = dutyCategoryState.dutyCategories;
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      title: "",
      description: "",
      hasTodos: false,
      projectId: projectId || "",
      categoryId: "",
    },
  });

  useEffect(() => {
    console.log(form.getValues());
  }, []);

  useEffect(() => {
    if (dutyId != 0) {
      dispatch(getDuty(dutyId));
    } else {
      form.reset();
    }
  }, [dutyId]);

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
    if (duty) {
      form.setValue("id", duty.id || 0);
      form.setValue("title", duty.title || "");
      form.setValue("description", duty.description || "");
      form.setValue("hasTodos", duty.hasTodos || false);
      form.setValue("categoryId", duty.categoryId?.toString() || "");
      form.setValue("projectId", duty.projectId?.toString() || projectId || "");
    }
  }, [duty]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      id: values.id,
      title: values.title,
      description: values.description,
      hasTodos: values.hasTodos,
      categoryId: parseInt(values.categoryId),
      projectId: parseInt(values.projectId),
    };

    if (values.id == 0) {
      dispatch(createDuty(request));
    } else {
      dispatch(updateDuty(values.id, request));
    }
    setOpen(false);
  };

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader>
          <DialogTitle>
            {dutyId === 0 ? (
              <p>Görev oluştur</p>
            ) : (
              <p>Görev düzenle</p>
            )}
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
                  placeholder="Başlık*"
                  fieldName="title"
                />
                <InputMarkdown
                  control={form.control}
                  placeholder="Açıklama*"
                  fieldName="description"
                />
                <InputSelect
                  control={form.control}
                  placeholder="Kategori"
                  fieldName="categoryId"
                  selectList={dutyCategories.map((x) => ({
                    value: x.id.toString(),
                    label: x.title,
                  }))}
                />
                <InputServerSelect
                  control={form.control}
                  placeholder="Proje"
                  fieldName="projectId"
                  entity="project"
                />
                <InputBoolean
                  control={form.control}
                  placeholder="Yapılacaklar listesi kullanılsın mı?"
                  fieldName="hasTodos"
                />

                {dutyId === 0 ? (
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading && (
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Gönder
                  </Button>
                ) : (
                  <div className="grid grid-cols-12 gap-2">
                    <Button disabled={loading} type="submit" className="col-span-10">
                      {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Gönder
                    </Button>
                    <Button disabled={loading} onClick={() => { setRemove(true) }} variant="destructive" className="col-span-2">
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

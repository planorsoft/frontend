import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  Dialog,
} from "@/components/ui/dialog";
import { createProject, getProject, updateProject } from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import { LoaderIcon, Trash2 } from "lucide-react";
import InputNumber from "@/components/ui/input-number";
import Remove from "@/components/remove";
import { InputServerSelect } from "@/components/ui/input-server-select";

const formSchema = z.object({
  id: z.number(),
  title: z.string().nonempty({ message: "Lütfen geçerli bir başlık giriniz" }),
  description: z.string(),
  isCompleted: z.boolean(),
  customerId: z.string().nonempty({ message: "Lütfen geçerli bir müşteri seçiniz" }),
  price: z.string(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  customerId: string | undefined;
}

const Upsert = ({ open, setOpen, projectId, customerId }: UpsertProps) => {
  const [loading, setLoading] = useState(false);
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
    getProjectRequest();
  }, [projectId]);

  const getProjectRequest = async () => {
    if (projectId != 0) {
      setLoading(true);
      try {
        const result = await getProject(projectId);
        form.setValue("id", result?.id);
        form.setValue("title", result?.title);
        form.setValue("description", result?.description);
        form.setValue("isCompleted", result?.isCompleted);
        form.setValue("customerId", result?.customerId.toString() || "");
        form.setValue("price", result?.price.toString() || "0");
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error;
        }
        toast({
          title: "Hata oluştu",
          description: error.response?.data.detail,
          variant: "destructive",
        });
      }
      setLoading(false);
    } else {
      form.reset();
      form.setValue("customerId", customerId || "");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    setLoading(true);
    try {
      const request = {
        id: values.id,
        title: values.title,
        description: values.description,
        isCompleted: values.isCompleted,
        customerId: parseInt(values.customerId),
        price: parseInt(values.price),
      };

      if (projectId === 0) {
        await createProject(request);
        toast({
          title: "Proje oluşturuldu",
        });
      } else {
        await updateProject(values.id, request);
        toast({
          title: "Proje güncellendi",
        });
      }
      setOpen(false);
      window.location.reload();
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.response?.data.detail,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

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
              {projectId === 0 ? "Proje oluştur" : "Proje düzenle"}
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
                  <InputString
                    control={form.control}
                    placeholder="Açıklama"
                    fieldName="description"
                  />
                  <InputBoolean
                    control={form.control}
                    placeholder="Tamamlandı mı?"
                    fieldName="isCompleted"
                  />
                  <InputServerSelect
                    control={form.control}
                    placeholder="Müşteri"
                    fieldName="customerId"
                    entity="customer"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Fiyat"
                    fieldName="price"
                  />
                  {projectId === 0 ? (
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Gönder
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
                        Gönder
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

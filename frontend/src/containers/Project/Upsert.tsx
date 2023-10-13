import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { createProject, getProject } from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import { LoaderIcon } from "lucide-react";
import InputNumber from "@/components/ui/input-number";

const formSchema = z.object({
  id: z.number(),
  title: z.string().nonempty({ message: "Lütfen geçerli bir başlık giriniz" }),
  description: z.string(),
  isOutsource: z.boolean(),
  customerId: z.number(),
  price: z.number()
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  forceUpadte: () => void,
  projectId: number
}

const Upsert = ({ open, setOpen, forceUpadte, projectId } : UpsertProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      isOutsource: false,
      customerId: 0,
      price: 0
    },
  });

  useEffect(() => {
    getProjectRequest();
  },[projectId])

  const getProjectRequest = async () => {
    if (projectId != 0) {
      setLoading(true);
      try {
        const result = await getProject(projectId);
        form.setValue("id", result?.id);
        form.setValue("title", result?.title);
        form.setValue("description", result?.description);
        form.setValue("isOutsource", result?.isOutsource);
        form.setValue("customerId", result?.customerId);
        form.setValue("price", result?.price);
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
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await createProject(values);
      toast({
        title: "Proje oluşturuldu",
      });
      setOpen(false);
      forceUpadte();
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Proje oluştur</SheetTitle>
          {loading ? <Loader /> : (
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
                  placeholder="Dış kaynak kullanıldı mı?"
                  fieldName="isOutsource"
                />
                <InputString
                  control={form.control}
                  placeholder="Müşteri Id"
                  fieldName="customerId"
                />
                <InputNumber
                  control={form.control}
                  placeholder="Fiyat"
                  fieldName="price"
                />
                <Button disabled={loading} type="submit" className="w-full">
                  {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                  Gönder
                </Button>
              </form>
            </Form>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Upsert;

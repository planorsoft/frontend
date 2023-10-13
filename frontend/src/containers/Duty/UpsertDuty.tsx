import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { LoaderIcon } from "lucide-react";
import { getDuty } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { DutyState } from "./types";

const formSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .nonempty({
      message: "Lütfen geçerli bir başlık giriniz.",
    }),
  description: z
    .string()
    .nonempty({
      message: "Lütfen geçerli bir açıklama giriniz.",
    }),
  projectId: z.number().int(),
  categoryId: z.number().int(),
  priorityId: z.number().int().optional(),
  sizeId: z.number().int().optional(),
  hasTodos: z.boolean(),
  completed: z.boolean(),
});

interface UpsertDutyProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  dutyId: number
}

const UpsertDuty = ({ open, setOpen, dutyId } : UpsertDutyProps) => {
  const dispatch = useAppDispatch();
  const dutyState = useAppSelector<DutyState>(state => state.dutyState);
  const loading = dutyState.loading;
  const error = dutyState.error;
  const duty = dutyState.duty;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      hasTodos: false,
      completed: false,
    },
  });

  useEffect(() => {
    if (dutyId != 0) {
      dispatch(getDuty(dutyId));      
    } else {
      form.reset();
    }
  },[dutyId])


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
      form.setValue("id", duty.id);
      form.setValue("title", duty.title);
      form.setValue("description", duty.description);
      form.setValue("hasTodos", duty.hasTodos);
      form.setValue("completed", duty.completed);
      form.setValue("categoryId", duty.categoryId);
      form.setValue("projectId", duty.projectId);
      form.setValue("sizeId", duty.sizeId);
      form.setValue("priorityId", duty.priorityId);
    } 
  }, [duty])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Görev oluştur</SheetTitle>
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
                  placeholder="Açıklama*"
                  fieldName="description"
                />
                <InputBoolean
                  control={form.control}
                  placeholder="Yapılacaklar listesi var mı?"
                  fieldName="hasTodos"
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

export default UpsertDuty;

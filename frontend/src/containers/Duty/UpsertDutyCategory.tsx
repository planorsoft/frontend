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
import { createDutyCategory, getDutyCategory, updateDutyCategory } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { DutyCategoryState } from "./types";
import Remove from "@/components/remove";

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty({
    message: "Lütfen geçerli bir başlık giriniz.",
  })
});

interface UpsertDutyCategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dutyCategoryId: number;
}

const UpsertDutyCategory = ({ open, setOpen, dutyCategoryId }: UpsertDutyCategoryProps) => {
  const dispatch = useAppDispatch();
  const dutyCategoryState = useAppSelector<DutyCategoryState>((state) => state.dutyCategoryState);
  const loading = dutyCategoryState.loading;
  const error = dutyCategoryState.error;
  const dutyCategory = dutyCategoryState.dutyCategory;
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      title: "",
    },
  });

  useEffect(() => {
    console.log(form.getValues());
  }, []);

  useEffect(() => {
    if (dutyCategoryId != 0) {
      dispatch(getDutyCategory(dutyCategoryId));
    } else {
      form.reset();
    }
  }, [dutyCategoryId]);

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
    if (dutyCategory) {
      form.setValue("id", dutyCategory.id || 0);
      form.setValue("title", dutyCategory.title || "");
    }
  }, [dutyCategory]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (values.id == 0) {
      dispatch(createDutyCategory(values));
    } else {
      dispatch(updateDutyCategory(values.id, values));
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
            {dutyCategoryId === 0 ? (
              <p>Kategori oluştur</p>
            ) : (
              <p>Kategori düzenle</p>
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

                {dutyCategoryId === 0 ? (
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
        entity="dutyCategory"
        entityId={dutyCategoryId}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
};

export default UpsertDutyCategory;

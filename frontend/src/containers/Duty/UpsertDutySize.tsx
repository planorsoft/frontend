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
import {
  createDutySize,
  getDutySize,
  updateDutySize,
} from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { DutySizeState } from "./types";
import Remove from "@/components/remove";

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty({
    message: "Lütfen geçerli bir isim giriniz.",
  }),
  score: z.string().nonempty({
    message: "Lütfen geçerli bir büyüklük giriniz.",
  }),
});

interface UpsertDutySizeProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dutySizeId: number;
}

const UpsertDutySize = ({
  open,
  setOpen,
  dutySizeId,
}: UpsertDutySizeProps) => {
  const dispatch = useAppDispatch();
  const dutySizeState = useAppSelector<DutySizeState>(
    (state) => state.dutySizeState
  );
  const loading = dutySizeState.loading;
  const error = dutySizeState.error;
  const dutySize = dutySizeState.dutySize;
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      name: "",
      score: ""
    },
  });

  useEffect(() => {
    form.reset();
  }, [open]);

  useEffect(() => {
    if (dutySizeId != 0) {
      dispatch(getDutySize(dutySizeId));
    }
  }, [dutySizeId]);

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
    if (dutySize) {
      form.setValue("id", dutySize.id || 0);
      form.setValue("name", dutySize.name || "");
      form.setValue("score", dutySize.score.toString() || "");
    }
  }, [dutySize]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const request = {
        id: values.id,
        name: values.name,
        score: parseInt(values.score)
    }

    if (values.id == 0) {
      dispatch(createDutySize(request));
    } else {
      dispatch(updateDutySize(request.id, request));
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
            {dutySizeId === 0 ? (
              <p>Büyüklük oluştur</p>
            ) : (
              <p>Büyüklük düzenle</p>
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
                  fieldName="name"
                />
                <InputString
                  control={form.control}
                  placeholder="Büyüklük*"
                  fieldName="score"
                />

                {dutySizeId === 0 ? (
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
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="dutySize"
        entityId={dutySizeId}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
};

export default UpsertDutySize;

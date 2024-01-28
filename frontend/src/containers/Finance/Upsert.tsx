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
import Remove from "@/components/remove";
import { useAppDispatch, useAppSelector } from "@/store";
import InputDateTime from "@/components/ui/input-date-time";
import { InputSelect } from "@/components/ui/input-select";
import { FinanceCategory, FinanceState, financeTypes } from "./types";
import {
  createFinance,
  getFinance,
  getFinanceCategories,
  resetFinanceStatus,
  updateFinance,
} from "./actions";
import { DateTime } from "luxon";
import InputNumber from "@/components/ui/input-number";
import { InputServerSelect } from "@/components/ui/input-server-select";

const formSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.string().nonempty({ message: "Miktar giriniz" }),
  date: z.date().nullish(),
  categoryId: z.string().nonempty({ message: "Kategori seçiniz" }),
  customerId: z.string(),
  projectId: z.string(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  financeId: number;
}

const Upsert = ({ open, setOpen, financeId }: UpsertProps) => {
  const dispatch = useAppDispatch();
  const [remove, setRemove] = useState<boolean>();
  const financeState = useAppSelector<FinanceState>(
    (state) => state.financeState
  );
  const finance = financeState.finance;
  const financeCategories = financeState.financeCategories;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      description: "",
      amount: "",
      date: null,
      categoryId: "",
      customerId: "",
      projectId: "",
    },
  });

  useEffect(() => {
    if (financeCategories.length <= 0) {
      dispatch(getFinanceCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (financeId == 0) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeId]);

  useEffect(() => {
    if (financeId === 0) {
      return;
    }
    if (!finance) {
      dispatch(getFinance(financeId));
    } else if (finance.id !== financeId) {
      dispatch(getFinance(financeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeId]);

  useEffect(() => {
    if (finance) {
        console.log(finance);
      form.setValue("id", finance.id || 0);
      form.setValue("description", finance.description || "");
      form.setValue("amount", finance.amount?.toString() || "");
      form.setValue(
        "date",
        finance.date ? DateTime.fromSeconds(finance.date).toJSDate() : undefined
      );
      form.setValue("categoryId", finance.categoryId?.toString() || "");
      form.setValue("customerId", finance.customerId?.toString() || "");
      form.setValue("projectId", finance.projectId?.toString() || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finance]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      ...values,
      amount: parseFloat(values.amount),
      categoryId: Number(values.categoryId),
      categoryName: financeCategories.find(
        (category) => category.id === Number(values.categoryId)
      )?.name,
      customerId: values.customerId ? Number(values.customerId) : null,
      projectId: values.projectId ? Number(values.projectId) : null,
      date: values.date
        ? DateTime.fromJSDate(values.date).toUnixInteger()
        : DateTime.now().toUnixInteger(),
    };
    if (financeId === 0) {
      dispatch(createFinance(request));
    } else {
      dispatch(updateFinance(financeId, request));
    }
  };

  useEffect(() => {
    switch (financeState.status) {
      case financeTypes.UPDATE_FINANCE_FAILURE ||
        financeTypes.CREATE_FINANCE_FAILURE ||
        null:
        toast({
          title: "Hata oluştu",
          description: financeState.error,
          variant: "destructive",
        });
        break;
      case financeTypes.UPDATE_FINANCE_SUCCESS:
        toast({
          title: "Finans güncellendi",
        });
        setOpen(false);
        dispatch(resetFinanceStatus());
        break;
      case financeTypes.CREATE_FINANCE_SUCCESS:
        toast({
          title: "Finans oluşturuldu",
        });
        setOpen(false);
        dispatch(resetFinanceStatus());
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeState.status]);

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll h-full w-screen m-2 md:w-6/12">
          <DialogHeader>
            <DialogTitle>
              {financeId === 0 ? "Finans oluştur" : "Finans düzenle"}
            </DialogTitle>
            {financeState.loading ? (
              <Loader />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <InputSelect
                    control={form.control}
                    placeholder="Kategori"
                    fieldName="categoryId"
                    selectList={financeCategories.map(
                      (category: FinanceCategory) => ({
                        value: category.id?.toString() || "",
                        label: category.name,
                      })
                    )}
                  />
                  <InputString
                    control={form.control}
                    placeholder="Açıklama"
                    fieldName="description"
                  />
                  <InputNumber
                    control={form.control}
                    placeholder="Miktar"
                    fieldName="amount"
                  />
                  <InputDateTime
                    control={form.control}
                    placeholder="Tarih"
                    fieldName="date"
                  />
                  <InputServerSelect
                    control={form.control}
                    placeholder="Finans"
                    fieldName="customerId"
                    entity="customer"
                  />
                  <InputServerSelect
                    control={form.control}
                    placeholder="Proje"
                    fieldName="projectId"
                    entity="project"
                  />
                  {financeId === 0 ? (
                    <Button
                      disabled={financeState.loading}
                      type="submit"
                      className="w-full"
                    >
                      {financeState.loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Gönder
                    </Button>
                  ) : (
                    <div className="grid grid-cols-12 gap-2">
                      <Button
                        disabled={financeState.loading}
                        type="submit"
                        className="col-span-10"
                      >
                        {financeState.loading && (
                          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Gönder
                      </Button>
                      <Button
                        disabled={financeState.loading}
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
        entity="finance"
        entityId={financeId}
        onDeleted={onDeleted}
      />
    </>
  );
};

export default Upsert;

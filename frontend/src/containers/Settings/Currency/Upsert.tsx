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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { LoaderIcon, Trash2 } from "lucide-react";
import { createCurrency, getCurrencies, updateCurrency } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrencyState } from "./types";
import Remove from "@/components/remove";
import { selectCurrencyById } from "./selector";
import InputNumber from "@/components/ui/input-number";

const formSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(2).max(10),
  symbol: z.string().max(10).optional(),
  rate: z.string().min(0),
});

interface UpsertCurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currencyId: number;
}

const UpsertCurrency = ({ open, setOpen, currencyId }: UpsertCurrencyProps) => {
  const dispatch = useAppDispatch();
  const currencyState = useAppSelector<CurrencyState>((state) => state.currencyState);
  const loading = currencyState.loading;
  const error = currencyState.error;
  const currency = selectCurrencyById(currencyState, currencyId);

  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      code: "",
      symbol: "",
      rate: "",
    },
  });

  useEffect(() => {
    if (currencyId == 0) {
      form.reset();
    }
  }, [currencyId]);

  useEffect(() => {
    if (currencyState.currencies.length === 0) {
      dispatch(getCurrencies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (currency) {
      form.setValue("id", currency.id || 0);
      form.setValue("code", currency.code || "");
      form.setValue("symbol", currency.symbol || "");
      form.setValue("rate", currency.rate?.toString() || "");
    }
  }, [currency]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      id: values.id,
      code: values.code,
      symbol: values.symbol,
      rate: parseFloat(values.rate),
    }
    if (values.id == 0) {
      dispatch(createCurrency(request));
    } else {
      dispatch(updateCurrency(currencyId, request));
    }
    setOpen(false);
  };

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>
            {currencyId === 0 ? (
              <p>Kur oluştur</p>
            ) : (
              <p>Kur düzenle</p>
            )}
          </SheetTitle>
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
                  placeholder="Kod*"
                  fieldName="code"
                />
                <InputString
                  control={form.control}
                  placeholder="Sembol"
                  fieldName="symbol"
                />
                <InputNumber
                  control={form.control}
                  placeholder="Kur"
                  fieldName="rate"
                />

                {currencyId === 0 ? (
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
        </SheetHeader>
      </SheetContent>
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="currency"
        entityId={currencyId}
        onDeleted={onDeleted}
      />
    </Sheet>
  );
};

export default UpsertCurrency;

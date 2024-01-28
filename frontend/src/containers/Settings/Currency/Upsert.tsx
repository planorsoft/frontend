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
import { createCurrency, getCurrencies, updateCurrency } from "./actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrencyState } from "./types";
import Remove from "@/components/remove";
import { selectCurrencyById } from "./selector";
import InputNumber from "@/components/ui/input-number";
import InputBoolean from "@/components/ui/input-boolean";
import { useTranslation } from "react-i18next";


interface UpsertCurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currencyId: number;
}

const UpsertCurrency = ({ open, setOpen, currencyId }: UpsertCurrencyProps) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    id: z.number().optional(),
    code: z
      .string()
      .min(2)
      .max(10)
      .nonempty({ message: t("settings.currency.model.code-validation") }),
    symbol: z.string().max(10).optional(),
    rate: z.string().min(0).nonempty({ message: t("settings.currency.model.rate-validation") }),
    isDefault: z.boolean(),
  });

  const dispatch = useAppDispatch();
  const currencyState = useAppSelector<CurrencyState>(
    (state) => state.currencyState
  );
  const loading = currencyState.loading;
  const currency = selectCurrencyById(currencyState, currencyId);

  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: 0,
      code: "",
      symbol: "",
      rate: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (currencyId == 0) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyId]);

  useEffect(() => {
    if (currencyState.currencies.length === 0) {
      dispatch(getCurrencies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currency) {
      form.setValue("id", currency.id || 0);
      form.setValue("code", currency.code || "");
      form.setValue("symbol", currency.symbol || "");
      form.setValue("rate", currency.rate?.toString() || "");
      form.setValue("isDefault", currency.isDefault || false);
    }
  }, [currency]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    const request = {
      id: values.id,
      code: values.code,
      symbol: values.symbol,
      rate: parseFloat(values.rate),
      isDefault: values.isDefault,
    };
    if (values.id == 0) {
      dispatch(createCurrency(request));
    } else {
      dispatch(updateCurrency(currencyId, request));
    }
  };

  useEffect(() => {
    switch (currencyState.status) {
      case "UPDATE_CURRENCY_SUCCESS":
        toast({
          title: t("common.update-succeeded"),
        });
        setOpen(false);
        break;
      case "CREATE_CURRENCY_SUCCESS":
        toast({
          title: t("common.create-succeeded"),
        });
        setOpen(false);
        break;
      case "UPDATE_CURRENCY_FAILURE":
        toast({
          title: t("common.error-occured"),
          description: currencyState.error,
          variant: "destructive",
        });
        break;
      case "CREATE_CURRENCY_FAILURE":
        toast({
          title: t("common.error-occured"),
          description: currencyState.error,
          variant: "destructive",
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyState.status]);

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader>
          <DialogTitle>
            {currencyId === 0 ? <p>{t("settings.currency.create")}</p> : <p>{t("settings.currency.edit")}</p>}
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
                  placeholder={`${t("settings.currency.model.code")}*`}
                  fieldName="code"
                />
                <InputString
                  control={form.control}
                  placeholder={t("settings.currency.model.symbol")}
                  fieldName="symbol"
                />
                <InputNumber
                  control={form.control}
                  placeholder={`${t("settings.currency.model.rate")}*`}
                  fieldName="rate"
                />
                <InputBoolean
                  control={form.control}
                  placeholder={t("settings.currency.model.set-default")}
                  fieldName="isDefault"
                />

                {currencyId === 0 ? (
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading && (
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("common.save")}
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
                      {t("common.save")}
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
        entity="currency"
        entityId={currencyId}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
};

export default UpsertCurrency;

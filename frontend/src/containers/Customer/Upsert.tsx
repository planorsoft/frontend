import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { createCustomer, getCustomer, updateCustomer } from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import formSchema from "./formSchema";
import { LoaderIcon, Trash2 } from "lucide-react";
import Remove from "@/components/remove";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrencyState } from "../Settings/Currency/types";
import { getCurrencies } from "../Settings/Currency/actions";
import { InputSelect } from "@/components/ui/input-select";

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: number;
}

const Upsert = ({ open, setOpen, customerId }: UpsertProps) => {
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState<boolean>();
  const currencyState = useAppSelector<CurrencyState>(
    (state) => state.currencyState
  );
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      isCompany: false,
      address: "",
      city: "",
      district: undefined,
      postCode: undefined,
      country: "",
      phoneNumber: undefined,
      website: undefined,
      governmentId: "",
      isPotantial: false,
      currencyCode: undefined,
    },
  });

  useEffect(() => {
    getCustomerRequest();
  }, [customerId]);

  useEffect(() => {
    console.log(currencyState.currencies);
    if (currencyState.currencies.length == 0) {
      dispatch(getCurrencies());
    }
  }, []);

  const getCustomerRequest = async () => {
    if (customerId != 0) {
      setLoading(true);
      try {
        const result = await getCustomer(customerId);
        form.setValue("id", result?.id || 0);
        form.setValue("name", result?.name || "");
        form.setValue("isCompany", result?.isCompany || false);
        form.setValue("address", result?.address || "");
        form.setValue("city", result?.city || "");
        form.setValue("district", result?.district || undefined);
        form.setValue("postCode", result?.postCode || undefined);
        form.setValue("country", result?.country || "");
        form.setValue("phoneNumber", result?.phoneNumber || undefined);
        form.setValue("website", result?.website || undefined);
        form.setValue("governmentId", result?.governmentId || "");
        form.setValue("isPotantial", result?.isPotantial || false);
        form.setValue("currencyCode", result?.currencyCode || undefined);
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
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    setLoading(true);
    console.log(customerId, values.id);
    try {
      if (customerId === 0) {
        await createCustomer(values);
      } else {
        await updateCustomer(values.id, values);
      }
      toast({
        title: "Müşteri oluşturuldu",
      });
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
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>
              {customerId === 0 ? "Müşteri oluştur" : "Müşteri düzenle"}
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
                    placeholder="İsim*"
                    fieldName="name"
                  />
                  <InputBoolean
                    control={form.control}
                    placeholder="Şirket"
                    fieldName="isCompany"
                  />
                  <InputBoolean
                    control={form.control}
                    placeholder="Potansiyel müşteri"
                    fieldName="isPotantial"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Adres*"
                    fieldName="address"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Şehir*"
                    fieldName="city"
                  />
                  <InputString
                    control={form.control}
                    placeholder="İlçe"
                    fieldName="district"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Posta kodu"
                    fieldName="postCode"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Ülke*"
                    fieldName="country"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Telefon numarası"
                    fieldName="phoneNumber"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Website"
                    fieldName="website"
                  />
                  <InputString
                    control={form.control}
                    placeholder="TCKNO / Vergi No*"
                    fieldName="governmentId"
                  />
                  <InputSelect
                    control={form.control}
                    placeholder="Kur"
                    fieldName="currencyCode"
                    selectList={currencyState.currencies.map((item) => ({
                      value: item.code,
                      label: item.code,
                    }))}
                  />
                  {customerId === 0 ? (
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="customer"
        entityId={customerId}
        onDeleted={onDeleted}
      />
    </>
  );
};

export default Upsert;

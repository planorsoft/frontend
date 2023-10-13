import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import { createCustomer, getCustomer } from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import formSchema from "./formSchema";
import { LoaderIcon } from "lucide-react";

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  forceUpadte: () => void,
  customerId: number
}

const Upsert = ({ open, setOpen, forceUpadte, customerId } : UpsertProps) => {
  const [loading, setLoading] = useState(false);

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
  },[customerId])

  const getCustomerRequest = async () => {
    if (customerId != 0) {
      setLoading(true);
      try {
        const result = await getCustomer(customerId);
        form.setValue("id", result?.id);
        form.setValue("name", result?.name);
        form.setValue("isCompany", result?.isCompany);
        form.setValue("address", result?.address);
        form.setValue("city", result?.city);
        form.setValue("district", result?.district);
        form.setValue("postCode", result?.postCode);
        form.setValue("country", result?.country);
        form.setValue("phoneNumber", result?.phoneNumber);
        form.setValue("website", result?.website);
        form.setValue("governmentId", result?.governmentId);
        form.setValue("isPotantial", result?.isPotantial);
        form.setValue("currencyCode", result?.currencyCode);
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
      await createCustomer(values);
      toast({
        title: "Müşteri oluşturuldu",
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
          <SheetTitle>Müşteri oluştur</SheetTitle>
          {loading ? <Loader /> : (
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
                <InputString
                  control={form.control}
                  placeholder="Kur"
                  fieldName="currencyCode"
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

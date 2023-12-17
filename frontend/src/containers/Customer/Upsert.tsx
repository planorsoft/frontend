import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  Dialog,
} from "@/components/ui/dialog";
import {
  createCustomer,
  deleteCustomerImage,
  getCustomer,
  updateCustomer,
  updateCustomerImage,
} from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import formSchema from "./formSchema";
import { LoaderIcon, Trash2 } from "lucide-react";
import Remove from "@/components/remove";
import { useAppSelector } from "@/store";
import { CurrencyState } from "../Settings/Currency/types";
import { InputSelect } from "@/components/ui/input-select";
import { selectCurrencyByDefault } from "../Settings/Currency/selector";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";

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
  const defaultCurrency = selectCurrencyByDefault(currencyState);
  const [imageUri, setImageUri] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      isCompany: false,
      address: "",
      city: "",
      district: "",
      postCode: "",
      country: "",
      phoneNumber: "",
      website: "",
      governmentId: "",
      isPotantial: false,
      currencyCode: "",
      contacts: [],
    },
  });

  useEffect(() => {
    getCustomerRequest();
  }, [customerId]);

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
        form.setValue("district", result?.district || "");
        form.setValue("postCode", result?.postCode || "");
        form.setValue("country", result?.country || "");
        form.setValue("phoneNumber", result?.phoneNumber || "");
        form.setValue("website", result?.website || "");
        form.setValue("governmentId", result?.governmentId || "");
        form.setValue("isPotantial", result?.isPotantial || false);
        setImageUri(result?.imageUri || "");
        form.setValue(
          "currencyCode",
          result?.currencyCode || defaultCurrency?.code || ""
        );
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
      form.setValue("currencyCode", defaultCurrency?.code || "");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    setLoading(true);
    try {
      if (customerId === 0) {
        await createCustomer(values);
        toast({
          title: "Müşteri oluşturuldu",
        });
      } else {
        await updateCustomer(values.id, values);
        toast({
          title: "Müşteri güncellendi",
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

  const handleUploadImage = async (file: File) => {
    try {
      const response = await updateCustomerImage(customerId, file);
      setImageUri(response.data);
      toast({
        title: "Fotoğraf başarıyla yüklendi",
      });
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
  };

  const handleRemoveImage = async () => {
    try {
      await deleteCustomerImage(customerId);
      setImageUri("");
      toast({
        title: "Fotoğraf başarıyla silindi",
      });
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
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll h-full w-screen m-2 md:w-6/12">
          <DialogHeader>
            <DialogTitle>
              {customerId === 0 ? "Müşteri oluştur" : "Müşteri düzenle"}
            </DialogTitle>
            {loading ? (
              <Loader />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {customerId !== 0 && (
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-10">
                        <h2 className="mb-1">Fotoğraf</h2>
                        <div className="grid grid-cols-12 gap-2">
                          <Input
                            type="file"
                            placeholder="Fotoğraf seç"
                            accept="image/png, image/jpeg"
                            className="col-span-10"
                            onChange={(e) => {
                              if (e.target.files) {
                                handleUploadImage(e.target.files[0]);
                              }
                            }}
                          />
                          <Button
                            className="col-span-2"
                            variant="outline"
                            type="button"
                            disabled={imageUri === ""}
                            onClick={() => {
                              handleRemoveImage();
                            }}
                          >
                            Sil
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Avatar className="h-14 w-14 mx-auto">
                          <AvatarImage
                            src={
                              imageUri ||
                              profileImageGenerator(form.getValues().name)
                            }
                          />
                          <AvatarFallback>
                            <LoaderIcon className="w-8 h-8 animate-spin" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  )}
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
                    placeholder="Adres"
                    fieldName="address"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Şehir"
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
                    placeholder="Ülke"
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
                    placeholder="TCKNO / Vergi No"
                    fieldName="governmentId"
                  />
                  <InputSelect
                    control={form.control}
                    placeholder="Döviz"
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
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

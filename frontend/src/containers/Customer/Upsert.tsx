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
import InputBoolean from "@/components/ui/input-boolean";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import formSchema from "./formSchema";
import { LoaderIcon, Trash2 } from "lucide-react";
import Remove from "@/components/remove";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrencyState } from "../Settings/Currency/types";
import { InputSelect } from "@/components/ui/input-select";
import { selectCurrencyByDefault } from "../Settings/Currency/selector";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";
import { CustomerState, customerTypes } from "./types";
import {
  createCustomer,
  deleteCustomerImage,
  getCustomer,
  resetCustomerStatus,
  updateCustomer,
  updateCustomerImage,
} from "./actions";
import { useTranslation } from "react-i18next";

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: number;
  isPotential: boolean;
}

const Upsert = ({ open, setOpen, customerId, isPotential }: UpsertProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [remove, setRemove] = useState<boolean>();
  const currencyState = useAppSelector<CurrencyState>(
    (state) => state.currencyState
  );
  const defaultCurrency = selectCurrencyByDefault(currencyState);
  const customerState = useAppSelector<CustomerState>(
    (state) => state.customerState
  );
  const customer = customerState.customer;
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
      isPotantial: isPotential,
      currencyCode: "",
      contacts: [],
    },
  });

  useEffect(() => {
    if (!customer) {
      dispatch(getCustomer(customerId));
    } else if (customer.id !== customerId) {
      dispatch(getCustomer(customerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    if (customer) {
      form.setValue("id", customer.id || 0);
      form.setValue("name", customer.name || "");
      form.setValue("isCompany", customer.isCompany || false);
      form.setValue("address", customer.address || "");
      form.setValue("city", customer.city || "");
      form.setValue("district", customer.district || "");
      form.setValue("postCode", customer.postCode || "");
      form.setValue("country", customer.country || "");
      form.setValue("phoneNumber", customer.phoneNumber || "");
      form.setValue("website", customer.website || "");
      form.setValue("governmentId", customer.governmentId || "");
      form.setValue("isPotantial", customer.isPotantial || false);
      form.setValue("currencyCode", customer.currencyCode || "");
      setImageUri(customer.imageUri || "");
      form.setValue(
        "currencyCode",
        customer.currencyCode || defaultCurrency?.code || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    if (values.id == 0) {
      dispatch(createCustomer(values));
    } else {
      dispatch(updateCustomer(customerId, values));
    }
  };

  useEffect(() => {
    switch (customerState.status) {
      case customerTypes.UPDATE_CUSTOMER_FAILURE ||
        customerTypes.CREATE_CUSTOMER_FAILURE ||
        customerTypes.UPDATE_CUSTOMER_IMAGE_FAILURE ||
        customerTypes.DELETE_CUSTOMER_IMAGE_FAILURE ||
        null:
        toast({
          title: "An error occurred",
          description: customerState.error,
          variant: "destructive",
        });
        break;
      case customerTypes.UPDATE_CUSTOMER_SUCCESS:
        toast({
          title: "Customer updated",
        });
        setOpen(false);
        dispatch(resetCustomerStatus());
        break;
      case customerTypes.CREATE_CUSTOMER_SUCCESS:
        toast({
          title: "Customer created",
        });
        setOpen(false);
        dispatch(resetCustomerStatus());
        break;
      case customerTypes.UPDATE_CUSTOMER_IMAGE_SUCCESS:
        setImageUri(customer?.imageUri || "");
        toast({
          title: "Photo uploaded successfully",
        });
        dispatch(resetCustomerStatus());
        break;
      case customerTypes.DELETE_CUSTOMER_IMAGE_SUCCESS:
        setImageUri("");
        toast({
          title: "Photo deleted successfully",
        });
        dispatch(resetCustomerStatus());
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerState.status]);

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  const handleUploadImage = async (file: File) => {
    dispatch(updateCustomerImage(customerId, file));
  };

  const handleRemoveImage = async () => {
    dispatch(deleteCustomerImage(customerId));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll h-full w-screen m-2 md:w-6/12">
          <DialogHeader>
            <DialogTitle>
              {customerId === 0 ? "Create customer" : "Edit customer"}
            </DialogTitle>
            {customerState.loading ? (
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
                        <h2 className="mb-1">{t("customer.photo")}</h2>
                        <div className="grid grid-cols-12 gap-2">
                          <Input
                            type="file"
                            placeholder="Select photo"
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
                            {t("common.delete")}
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Avatar className="h-14 w-14 mx-auto">
                          <AvatarImage
                            src={
                              imageUri ||
                              profileImageGenerator(customer?.name || "HG")
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
                    placeholder={`${t("customer.name")} *`}
                    fieldName="name"
                  />
                  <InputBoolean
                    control={form.control}
                    placeholder={`${t("customer.company")}`}
                    fieldName="isCompany"
                  />
                  <InputBoolean
                    control={form.control}
                    disabled={customerId === 0}
                    placeholder={`${t("customer.potential")}`}
                    fieldName="isPotantial"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.address")}`}
                    fieldName="address"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.city")}`}
                    fieldName="city"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.district")}`}
                    fieldName="district"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.postCode")}`}
                    fieldName="postCode"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.country")}`}
                    fieldName="country"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.phoneNumber")}`}
                    fieldName="phoneNumber"
                  />
                  <InputString
                    control={form.control}
                    placeholder="Website"
                    fieldName="website"
                  />
                  <InputString
                    control={form.control}
                    placeholder={`${t("customer.governmentId")}`}
                    fieldName="governmentId"
                  />
                  <InputSelect
                    control={form.control}
                    placeholder={`${t("customer.currency")}`}
                    fieldName="currencyCode"
                    selectList={currencyState.currencies.map((item) => ({
                      value: item.code,
                      label: item.code,
                    }))}
                  />
                  {customerId === 0 ? (
                    <Button
                      disabled={customerState.loading}
                      type="submit"
                      className="w-full"
                    >
                      {customerState.loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {t("common.save")}
                    </Button>
                  ) : (
                    <div className="grid grid-cols-12 gap-2">
                      <Button
                        disabled={customerState.loading}
                        type="submit"
                        className="col-span-10"
                      >
                        {customerState.loading && (
                          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t("common.save")}
                      </Button>
                      <Button
                        disabled={customerState.loading}
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

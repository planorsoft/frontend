import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store";
import {
  CircleSlash,
  Info,
  Loader,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerState } from "./types";
import { selectCustomerById } from "./selector";
import { profileImageGenerator } from "@/lib/profile-image";
import { useTranslation } from "react-i18next";

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: number;
}

const Detail = ({ open, setOpen, setUpsertOpen, customerId }: DetailProps) => {
  const customerState = useAppSelector<CustomerState>(
    (state) => state.customerState
  );
  const customer = selectCustomerById(customerState, customerId);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        {customer?.id ? (
          <DialogHeader className="text-left space-y-4">
            <DialogTitle className="flex items-center space-x-4 pb-3">
              <Avatar className="h-7 w-7 max-[320px]:hidden">
                <AvatarImage
                  src={
                    customer?.imageUri || profileImageGenerator(customer?.name)
                  }
                />
                <AvatarFallback>
                  <Loader className="w-8 h-8 animate-spin" />
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold leading-none tracking-tight">
                {customer?.name}
              </p>
            </DialogTitle>

            <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
              <Info className="w-6 h-6 mt-px" />
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  {t("customer.isCompany")}:
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer?.isCompany ? t("common.yes") : t("common.no")}
                </p>
              </div>
            </div>

            <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
              <Info className="w-6 h-6 mt-px" />
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  {t("customer.isPotantial")}:
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer?.isPotantial ? t("common.yes") : t("common.no")}
                </p>
              </div>
            </div>

            {customer?.address && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.address")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.address}
                  </p>
                </div>
              </div>
            )}

            {customer?.city && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.city")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.city}
                  </p>
                </div>
              </div>
            )}

            {customer?.country && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.country")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.country}
                  </p>
                </div>
              </div>
            )}

            {customer?.district && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.district")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.district}
                  </p>
                </div>
              </div>
            )}

            {customer?.governmentId && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.governmentId")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.governmentId}
                  </p>
                </div>
              </div>
            )}

            {customer?.website && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {t("customer.website")}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer?.website}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                variant="default"
                className="col-span-2"
                onClick={() => {
                  setUpsertOpen(true);
                  setOpen(false);
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
        ) : (
          <Alert>
            <CircleSlash className="h-4 w-4" />
            <AlertTitle>{t("customer.not-found")}</AlertTitle>
            <AlertDescription>
              {t("customer.not-found-description")}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Detail;

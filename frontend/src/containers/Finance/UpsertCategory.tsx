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
import {
  createFinanceCategory,
  getFinanceCategory,
  resetFinanceStatus,
  updateFinanceCategory,
} from "./actions";
import { FinanceState, financeTypes } from "./types";
import { useTranslation } from "react-i18next";



interface UpsertCategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  financeCategoryId: number;
}

const UpsertCategory = ({
  open,
  setOpen,
  financeCategoryId,
}: UpsertCategoryProps) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({ message: t("finance.category.model.name-validation") }),
  });

  const dispatch = useAppDispatch();
  const [remove, setRemove] = useState<boolean>();
  const financeState = useAppSelector<FinanceState>(
    (state) => state.financeState
  );
  const financeCategory = financeState.financeCategory;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
    if (financeCategoryId == 0) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeCategoryId]);

  useEffect(() => {
    if (financeCategoryId === 0) {
      return;
    }
    if (!financeCategory) {
      dispatch(getFinanceCategory(financeCategoryId));
    } else if (financeCategory.id !== financeCategoryId) {
      dispatch(getFinanceCategory(financeCategoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeCategoryId]);

  useEffect(() => {
    if (financeCategory) {
      form.setValue("id", financeCategory.id || 0);
      form.setValue("name", financeCategory.name || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeCategory]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    if (financeCategoryId === 0) {
      dispatch(createFinanceCategory(values));
    } else {
      dispatch(updateFinanceCategory(financeCategoryId, values));
    }
  };

  useEffect(() => {
    switch (financeState.status) {
      case financeTypes.UPDATE_FINANCE_CATEGORY_FAILURE ||
        financeTypes.CREATE_FINANCE_CATEGORY_FAILURE ||
        null:
        toast({
          title: t("common.error-occured"),
          description: financeState.error,
          variant: "destructive",
        });
        break;
      case financeTypes.UPDATE_FINANCE_CATEGORY_SUCCESS:
        toast({
          title: t("common.update-succeeded"),
        });
        setOpen(false);
        dispatch(resetFinanceStatus());
        break;
      case financeTypes.CREATE_FINANCE_CATEGORY_SUCCESS:
        toast({
          title: t("common.create-succeeded"),
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
              {financeCategoryId === 0
                ? t("finance.category.create")
                : t("finance.category.edit")}
            </DialogTitle>
            {financeState.loading ? (
              <Loader />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <InputString
                    control={form.control}
                    placeholder={t("finance.category.model.name")}
                    fieldName="name"
                  />
                  {financeCategoryId === 0 ? (
                    <Button
                      disabled={financeState.loading}
                      type="submit"
                      className="w-full"
                    >
                      {financeState.loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {t("common.save")}
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
                        {t("common.save")}
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
        entity="financeCategory"
        entityId={financeCategoryId}
        onDeleted={onDeleted}
      />
    </>
  );
};

export default UpsertCategory;

import { Button } from "@/components/ui/button";
import { FinanceState } from "@/containers/Finance/types";
import { CircleSlash, Loader, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getFinanceCategories } from "./actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UpsertCategory from "./UpsertCategory";
import { useTranslation } from "react-i18next";

const List = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const financeState = useAppSelector<FinanceState>(
    (state) => state.financeState
  );
  const loading = financeState.loading;

  useEffect(() => {
    if (financeState.financeCategories.length <= 0) {
      dispatch(getFinanceCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (id: number) => {
    setId(id);
    setOpen(true);
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          {t("finance.category.title")}
        </h2>
        <Button
          onClick={() => {
            select(0);
          }}
        >
          <Plus size={16} /> {t("finance.category.create")}
        </Button>
      </div>
      {loading ? (
        <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
      ) : financeState.financeCategories.length > 0 ? (
        <>
          <Table>
            <TableCaption>{t("finance.category.title")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("finance.category.model.id")}</TableHead>
                <TableHead>{t("finance.category.model.name")}</TableHead>
                <TableHead>{t("common.action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financeState.financeCategories.map((finance) => (
                <TableRow key={finance.id}>
                  <TableCell>{finance.id}</TableCell>
                  <TableCell>{finance.name}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => select(finance.id || 0)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Alert>
          <CircleSlash className="h-4 w-4" />
          <AlertTitle>{t("finance.category.not-found")}</AlertTitle>
          <AlertDescription>
            {t("finance.category.not-found-description")}
          </AlertDescription>
        </Alert>
      )}
      <UpsertCategory open={open} setOpen={setOpen} financeCategoryId={id} />
    </div>
  );
};

export default List;

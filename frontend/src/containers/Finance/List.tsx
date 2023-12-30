import { Button } from "@/components/ui/button";
import { Finance, FinanceState } from "@/containers/Finance/types";
import {
  CircleSlash,
  Loader,
  Pencil,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getFinances } from "./actions";
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
import Upsert from "./Upsert";
import { selectIncomes, selectOutcomes } from "./selector";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "income" | "outcome";
}

const List = ({ type }: ListProps) => {
  const isIncome = type === "income";
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const financeState = useAppSelector<FinanceState>(
    (state) => state.financeState
  );
  const loading = financeState.loading;
  const finances = isIncome ? selectIncomes(financeState) : selectOutcomes(financeState);

  useEffect(() => {
    if (financeState.finances) {
      dispatch(getFinances(isIncome));
    }
  }, [type]);

  const select = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const fetchPage = (page: number) => {
    dispatch(getFinances(isIncome, page));
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          {type === "income" ? "Gelirler" : "Giderler"}
        </h2>
        <Button
          onClick={() => {
            select(0);
          }}
        >
          <Plus size={16} /> Yeni Finans
        </Button>
      </div>
      {loading ? (
        <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
      ) : finances.length > 0 ? (
        <>
          <Table>
            <TableCaption>
              {type === "income" ? "Gelirler" : "Giderler"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finances.map((finance : Finance) => (
                <TableRow key={finance.id}>
                  <TableCell>{finance.id}</TableCell>
                  <TableCell>{finance.categoryName}</TableCell>
                  <TableCell>{finance.amount}</TableCell>
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchPage(financeState.pagination.pageNumber - 1);
              }}
              disabled={!financeState.pagination.hasPreviousPage}
            >
              Önceki
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchPage(financeState.pagination.pageNumber + 1);
              }}
              disabled={!financeState.pagination.hasNextPage}
            >
              Sonraki
            </Button>
          </div>
        </>
      ) : (
        <Alert>
          <CircleSlash className="h-4 w-4" />
          <AlertTitle>Finans bulunamadı!</AlertTitle>
          <AlertDescription>
            Yukarıdaki butondan ilk verini oluşturabilirsin
          </AlertDescription>
        </Alert>
      )}
      <Upsert open={open} setOpen={setOpen} financeId={id} />
    </div>
  );
};

export default List;

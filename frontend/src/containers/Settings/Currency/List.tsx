import { useAppDispatch, useAppSelector } from "@/store";
import { CurrencyState } from "./types";
import { useEffect, useState } from "react";
import { getCurrencies } from "./actions";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import Upsert from "@/containers/Settings/Currency/Upsert";

const List = () => {
  const dispatch = useAppDispatch();
  const currencyState = useAppSelector<CurrencyState>(
    (state) => state.currencyState
  );
  const [upsert, showUpsert] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (currencyState.currencies.length === 0) {
      dispatch(getCurrencies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currencyState.error) {
      toast({
        title: "Hata oluştu",
        description: currencyState.error,
        variant: "destructive",
      });
    }
  }, [currencyState.error]);

  const handleUpsert = (id: number = 0) => {
    setId(id);
    showUpsert(true);
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      {currencyState.loading ? (
        <Loader />
      ) : currencyState.currencies.length == 0 ? (
        <Alert>
          <AlertTitle>Döviz bulunamadı</AlertTitle>
          <AlertDescription>
            Döviz ayarlarınızı aşağıdan oluşturabilirsiniz.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="flex justify-between my-2">
            <h2 className="text-2xl font-semibold">Dövizler</h2>
            <div className="flex justify-end gap-2">
              <Button onClick={() => { handleUpsert(0); }} >
                <Plus className="w-4 h-4" /> Kur
              </Button>
            </div>
          </div>
          <Table>
            <TableCaption>Sisteminizde kullanılabilir dövizler</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Kod</TableHead>
                <TableHead>Sembol</TableHead>
                <TableHead>Kur / TRY</TableHead>
                <TableHead>Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencyState.currencies.map((currency) => (
                <TableRow key={currency.id}>
                  <TableCell>{currency.id}</TableCell>
                  <TableCell>{currency.code}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>{currency.rate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpsert(currency.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <Upsert open={upsert} setOpen={showUpsert} currencyId={id} />
    </div>
  );
};

export default List;

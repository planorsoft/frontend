import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Customer } from "@/containers/Customer/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Upsert from "@/containers/Customer/Upsert";
import useForceUpdate from "@/hooks/use-force-update";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "real" | "potential";
}

const List = ({ type }: ListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const filter = type === "real" ? "IsPotantial eq false" : "IsPotantial eq true";
  const forceUpadte = useForceUpdate();

  useEffect(() => {}, [type]);

  const select = (id : number) => {
    setId(id);
    setOpen(true);
  }

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">Müşteriler</h2>
          <Button onClick={openUpsert}>
            <Plus size={16} /> Yeni Müşteri
          </Button>
      </div>
      <DataTable<Customer>
        url="/odata/customers"
        entity="customer"
        filter={filter}
        select={select}
      />
      <Upsert 
        open={open} 
        setOpen={setOpen} 
        forceUpadte={forceUpadte} 
        customerId={id}
      />
    </div>
  );
};

export default List;

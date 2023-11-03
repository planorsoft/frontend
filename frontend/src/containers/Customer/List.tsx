import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Customer } from "@/containers/Customer/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Upsert from "@/containers/Customer/Upsert";
import useTitle from "@/hooks/use-title";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "real" | "potential";
}

const List = ({ type }: ListProps) => {
  useTitle("Müşteriler");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const filter =
    type === "real" ? "IsPotantial eq false" : "IsPotantial eq true";

  useEffect(() => {}, [type]);

  const select = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          {type === "real" ? "Müşteriler" : "Potansiyel Müşteriler"}
        </h2>
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
      {open && <Upsert open={open} setOpen={setOpen} customerId={id} />}
    </div>
  );
};

export default List;

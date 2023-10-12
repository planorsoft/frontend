import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Customer } from "@/containers/Customer/types";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import Upsert from "@/containers/Customer/Upsert";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "real" | "potential";
}

const List = ({ type }: ListProps) => {
  const filter =
    type === "real" ? "IsPotantial eq false" : "IsPotantial eq true";

  useEffect(() => {}, [type]);

  return (
    <div>
      <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">Müşteriler</h2>
        <Sheet>
          <SheetTrigger>
            <Button>
              <Plus size={16} /> Yeni Müşteri
            </Button>
          </SheetTrigger>
          <Upsert />
        </Sheet>
      </div>
      <DataTable<Customer>
        url="/odata/customers"
        entity="customer"
        filter={filter}
      />
    </div>
  );
};

export default List;

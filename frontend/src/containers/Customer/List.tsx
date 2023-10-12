import DataTable from "@/components/data-table";
import { Customer } from "@/containers/Customer/types";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "real" | "potential"; 
}

const List = ({ type } : ListProps) => {

  return (
    <DataTable<Customer>
      url="/odata/customers"
      entity="customer"
    />
  )
}

export default List
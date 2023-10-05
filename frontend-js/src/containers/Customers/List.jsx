import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "@/containers/Customers/actions";
import DataTable from "@/components/DataTable";
import Toolbar from "@/components/Toolbar";
import CreateCustomer from "@/containers/Customers/Create";
import UpdateCustomer from "@/containers/Customers/Update";
import RemoveCustomer from "@/containers/Customers/Remove";
import { useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CustomerList({ isPotential }) {
  const dispath = useDispatch();
  const columns = [
    { title: "Id", field: "id" },
    { title: "İsim", field: "name", route: isPotential ? "customers/potential/detail" : "customers/detail" },
    { title: "Şirket", field: "isCompany" },
  ];
  const { customers, loading, totalCount, hasNext, hasPrevious } = useSelector((state) => state.customer);
  const create = useDisclosure();
  const update = useDisclosure();
  const remove = useDisclosure();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleUpdateCustomer = (id) => {
    setSelectedCustomerId(id);
    update.onOpen();
  };

  const handleRemoveCustomer = (id) => {
    setSelectedCustomerId(id);
    remove.onOpen();
  };

  useEffect(() => {
    dispath(getCustomerList(1, isPotential));
  }, [dispath, isPotential]);

  return (
    <>
      <Toolbar title={isPotential ? "Potansiyel müşteriler" : "Müşteriler"} onCreateOpen={create.onOpen} />
      <CreateCustomer isOpen={create.isOpen} onClose={create.onClose} />
      <UpdateCustomer selectedCustomerId={selectedCustomerId} isOpen={update.isOpen} onClose={update.onClose} />
      <RemoveCustomer selectedCustomerId={selectedCustomerId} isOpen={remove.isOpen} onClose={remove.onClose} />
      <DataTable
        loading={loading}
        data={customers}
        columns={columns}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        totalCount={totalCount}
        updateItem={handleUpdateCustomer}
        removeItem={handleRemoveCustomer}
        paginated
        fetchData={(page) => {
          dispath(getCustomerList(page));
        }}
      />
    </>
  );
}

CustomerList.propTypes = {
  isPotential: PropTypes.bool,
};

export default CustomerList;

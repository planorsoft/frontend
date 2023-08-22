import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "@/containers/Customers/actions";
import DataTable from "@/components/DataTable";
import Toolbar from "@/components/Toolbar";
import CreateCustomer from "@/containers/Customers/Create";
import UpdateCustomer from "@/containers/Customers/Update";
import { useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CustomerList({ isPotential }) {
  const dispath = useDispatch();
  const columns = [
    { title: "Id", field: "id" },
    { title: "İsim", field: "name" },
    { title: "Şirket", field: "isCompany" },
  ];
  const { customers, loading, totalCount, hasNext, hasPrevious } = useSelector((state) => state.customer);
  const create = useDisclosure();
  const update = useDisclosure();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleSelectCustomer = (id) => {
    setSelectedCustomerId(id);
    update.onOpen();
  };

  useEffect(() => {
    dispath(getCustomerList(1, isPotential));
  }, [dispath, isPotential]);

  return (
    <>
      <Toolbar title="Müşteriler" onCreateOpen={create.onOpen} />
      <CreateCustomer isOpen={create.isOpen} onClose={create.onClose} />
      <UpdateCustomer selectedCustomerId={selectedCustomerId} isOpen={update.isOpen} onClose={update.onClose} />
      <DataTable
        loading={loading}
        data={customers}
        columns={columns}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        totalCount={totalCount}
        selectId={handleSelectCustomer}
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

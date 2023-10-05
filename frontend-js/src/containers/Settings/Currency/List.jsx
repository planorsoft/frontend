import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyList } from "@/containers/Settings/Currency/actions";
import DataTable from "@/components/DataTable";
import Toolbar from "@/components/Toolbar";
import CreateCurrency from "@/containers/Settings/Currency/Create";
import UpdateCurrency from "@/containers/Settings/Currency/Update";
import RemoveCurrency from "@/containers/Settings/Currency/Remove";
import { useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CurrencyList() {
  const dispatch = useDispatch();
  const columns = [
    { title: "Kod", field: "code" },
    { title: "Kur", field: "rate" },
  ];
  const { currencies, loading } = useSelector((state) => state.currency);
  const create = useDisclosure();
  const update = useDisclosure();
  const remove = useDisclosure();
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(null);

  const handleUpdateCurrency = (id) => {
    setSelectedCurrencyId(id);
    update.onOpen();
  };

  const handleRemoveCurrency = (id) => {
    setSelectedCurrencyId(id);
    remove.onOpen();
  };

  useEffect(() => {
    dispatch(getCurrencyList());
  }, [dispatch]);

  return (
    <>
      <Toolbar title="Dövizler" onCreateOpen={create.onOpen} />
      <CreateCurrency isOpen={create.isOpen} onClose={create.onClose} />
      <UpdateCurrency selectedCurrencyId={selectedCurrencyId} isOpen={update.isOpen} onClose={update.onClose} />
      <RemoveCurrency selectedCurrencyId={selectedCurrencyId} isOpen={remove.isOpen} onClose={remove.onClose} />
      <DataTable
        loading={loading}
        data={currencies}
        columns={columns}
        updateItem={handleUpdateCurrency}
        removeItem={handleRemoveCurrency}
        fetchData={(page) => {
          dispatch(getCurrencyList(page));
        }}
      />
    </>
  );
}

CurrencyList.propTypes = {
  isPotential: PropTypes.bool,
};

export default CurrencyList;

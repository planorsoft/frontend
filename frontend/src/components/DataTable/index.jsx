import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import Loading from "@/components/Loading";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import Paginator from "./Paginator";
import { FiEdit2 } from "react-icons/fi";

function DataTable({
  data,
  hasNext,
  hasPrevious,
  columns,
  loading,
  fetchData,
  selectId,
}) {
  const [page, setPage] = useState(1);

  const handleFetchWithPage = (page) => {
    setPage(page);
    fetchData(page);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column, index) => (
                <Th key={index}>{column.title}</Th>
              ))}
              <Th>İşlemler</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                {columns.map((column, index) => {
                  if (typeof item[column.field] === "boolean") {
                    return (
                      <Td key={index}>
                        {item[column.field] ? (
                          <Badge colorScheme="green">
                            <Icon as={FiCheck} />
                          </Badge>
                        ) : (
                          <Badge colorScheme="yellow">
                            <Icon as={FiX} />
                          </Badge>
                        )}
                      </Td>
                    );
                  }

                  return <Td key={index}>{item[column.field]}</Td>;
                })}
                <Td>
                  <IconButton
                    size="sm"
                    variant="outline"
                    colorScheme="gray"
                    icon={<FiEdit2 />}
                    onClick={() => selectId(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Paginator
        page={page}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        fetchData={handleFetchWithPage}
      />
    </>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  fetchData: PropTypes.func,
  selectId: PropTypes.func
};

export default DataTable;

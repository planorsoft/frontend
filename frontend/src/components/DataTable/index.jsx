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
import { FiCheck, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import Paginator from "./Paginator";

function DataTable({
  data,
  paginated = false,
  hasNext,
  hasPrevious,
  columns,
  loading,
  fetchData,
  updateItem,
  removeItem,
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
              {updateItem && <Th width={"1rem"}></Th>}
              {removeItem && <Th width={"1rem"}></Th>}
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
                {updateItem && (
                  <Td>
                    <IconButton
                      size="sm"
                      variant="outline"
                      colorScheme="gray"
                      icon={<FiEdit2 />}
                      onClick={() => updateItem(item.id)}
                    />
                  </Td>
                )}
                {removeItem && (
                  <Td>
                    <IconButton
                      size="sm"
                      variant="outline"
                      className="p-2"
                      colorScheme="gray"
                      icon={<FiTrash2 />}
                      onClick={() => removeItem(item.id)}
                    />
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {paginated && (
        <Paginator
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          fetchData={handleFetchWithPage}
        />
      )}
    </>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  paginated: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  loading: PropTypes.bool,
  fetchData: PropTypes.func,
  updateItem: PropTypes.func,
  removeItem: PropTypes.func,
};

export default DataTable;

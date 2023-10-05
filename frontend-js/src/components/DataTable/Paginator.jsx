import { Button, Flex, IconButton } from "@chakra-ui/react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import PropTypes from "prop-types";

function Paginator({ page, hasNext, hasPrevious, fetchData }) {
  return (
    <Flex justifyContent="center" alignContent="center" m="4" gap="1">
      <IconButton
        isDisabled={!hasPrevious}
        colorScheme="gray"
        variant="outline"
        icon={<FiChevronsLeft />}
        onClick={() => {
          fetchData(page - 1);
        }}
      />

      <Button
        colorScheme="gray"
      >
        {page}
      </Button>

      <IconButton
        colorScheme="gray"
        variant="outline"
        isDisabled={!hasNext}
        icon={<FiChevronsRight />}
        onClick={() => {
          fetchData(page + 1);
        }}
      />
    </Flex>
  );
}

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Paginator;

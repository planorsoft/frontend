import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";

function Toolbar({ title, onCreateOpen }) {
  return (
    <Flex my="3" justifyContent="space-between">
      <Heading as="h1" size="lg">
        { title }
      </Heading>
      <Flex gap="3">
        <IconButton
          colorScheme="gray"
          aria-label="Oluştur"
          icon={<FiPlus />}
          onClick={onCreateOpen}
        />
      </Flex>
    </Flex>
  );
}

Toolbar.propTypes = {
    title: PropTypes.string,
    onCreateOpen: PropTypes.func,
};

export default Toolbar;

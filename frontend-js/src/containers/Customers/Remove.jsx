import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "@/containers/Customers/actions";

function Remove({ selectedCustomerId, isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteCustomer(selectedCustomerId));
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Müşteri silinsin mi?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Bu işlem geri alınamaz!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleRemove}>
            Sil
          </Button>
          <Button variant="ghost" onClick={()=>{ onClose() }}>İptal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

Remove.propTypes = {
  selectedCustomerId: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Remove;

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
import { deleteCurrency } from "@/containers/Settings/Currency/actions";

function Remove({ selectedCurrencyId, isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteCurrency(selectedCurrencyId));
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Döviz silinsin mi?</ModalHeader>
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
  selectedCurrencyId: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Remove;

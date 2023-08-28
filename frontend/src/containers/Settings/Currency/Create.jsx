import {
  FormControl,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyList, createCurrency } from "@/containers/Settings/Currency/actions";
import currencyTypes from "@/containers/Settings/Currency/types";
import validate from "@/utils/validate";
import validations from "@//containers/Settings/Currency/validations";

function Create({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { error, status } = useSelector((state) => state.currency);
  const hasError = (field) => field in formErrors;

  const [formErrors, setFormErrors] = useState({});
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState(1);



  const onSubmitHandler = (e) => {
    e.preventDefault();

    const currency = {
      code,
      symbol,
      rate,
    };

    const validationResults = validate(validations, currency);
    setFormErrors(validationResults);
    if (Object.keys(validationResults).length > 0) return;

    dispatch(createCurrency(currency));
  };

  useEffect(() => {
    if (status === currencyTypes.CREATE_CURRENCY_SUCCESS) {
      toast({
        title: "Döviz başarıyla oluşturuldu.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
      onClose();
      dispatch(getCurrencyList());
    } else if (status === currencyTypes.CREATE_CURRENCY_FAILURE) {
      toast({
        title: "Döviz oluşturulurken hata alındı.",
        description: error,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  }, [status, onClose]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Döviz ekle</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <FormControl isInvalid={hasError("code")}>
              <FormLabel htmlFor="code">Kod</FormLabel>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {formErrors.code && (
                <FormErrorMessage>{formErrors.code}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={hasError("symbol")}>
              <FormLabel htmlFor="symbol">Sembol</FormLabel>
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
              {formErrors.symbol && (
                <FormErrorMessage>{formErrors.symbol}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={hasError("rate")}>
              <FormLabel htmlFor="rate">Kur</FormLabel>
              <NumberInput  id="rate"
                value={rate}
                onChange={(e) => setRate(e)} 
                defaultValue={15} 
                precision={2} 
                step={0.01}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formErrors.rate && (
                <FormErrorMessage>{formErrors.rate}</FormErrorMessage>
              )}
            </FormControl>

          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button colorScheme="green" onClick={onSubmitHandler}>
            Oluştur
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

Create.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Create;

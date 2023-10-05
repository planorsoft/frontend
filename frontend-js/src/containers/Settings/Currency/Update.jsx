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
import {
  getCurrencyList,
  getCurrency,
  updateCurrency,
} from "@/containers/Settings/Currency/actions";
import currencyTypes from "@/containers/Settings/Currency/types";
import validate from "@/utils/validate";
import validations from "@//containers/Settings/Currency/validations";

function Update({ isOpen, onClose, selectedCurrencyId }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { currency, error, status } = useSelector((state) => state.currency);
  const hasError = (field) => field in formErrors;

  const [formErrors, setFormErrors] = useState({});
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    dispatch(getCurrency(selectedCurrencyId));
  }, [dispatch, selectedCurrencyId]);

  useEffect(() => {
    if (status === currencyTypes.UPDATE_CURRENCY_SUCCESS) {
      toast({
        title: "Döviz başarıyla güncellendi.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
      onClose();
      dispatch(getCurrencyList());
    } else if (status === currencyTypes.UPDATE_CURRENCY_FAILURE) {
      toast({
        title: "Döviz güncellenirken hata alındı.",
        description: error,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    } else if (status === currencyTypes.GET_CURRENCY) {
      setCode(currency.code ?? "");
      setSymbol(currency.symbol ?? "");
      setRate(currency.rate ?? "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, status, onClose]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const currency = {
      id: selectedCurrencyId,
      code,
      symbol,
      rate,
    };

    const validationResults = validate(validations, currency);
    setFormErrors(validationResults);
    if (Object.keys(validationResults).length > 0) return;

    dispatch(updateCurrency(selectedCurrencyId, currency));
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Döviz güncelle</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <FormControl isInvalid={hasError("code")} isRequired>
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

            <FormControl isInvalid={hasError("rate")} isRequired>
              <FormLabel htmlFor="rate">Kur</FormLabel>
              <NumberInput
                id="rate"
                value={rate}
                onChange={(e) => setRate(e)}
                defaultValue={15}
                precision={2}
                step={0.01}
              >
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
            Güncelle
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

Update.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selectedCurrencyId: PropTypes.number,
};

export default Update;

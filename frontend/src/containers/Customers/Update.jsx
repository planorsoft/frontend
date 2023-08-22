import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, updateCustomer } from "@/containers/Customers/actions";
import customerTypes from "@/containers/Customers/types";

function Update({ isOpen, onClose, selectedCustomerId }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { customer, error, status } = useSelector((state) => state.customer);
  const [name, setName] = useState("");
  const [isCompany, setIsCompany] = useState(true);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [isPotantial, setIsPotantial] = useState(false);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    dispatch(getCustomer(selectedCustomerId));
  }, [dispatch, selectedCustomerId]);

  useEffect(() => {
    if (status === customerTypes.UPDATE_CUSTOMER_SUCCESS) {
      toast({
        title: "Müşteri başarıyla güncellendi.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
      onClose();
    } else if (status === customerTypes.UPDATE_CUSTOMER_FAILURE) {
      toast({
        title: "Müşteri güncellenirken hata alındı.",
        description: error,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    } else if (status === customerTypes.GET_CUSTOMER_SUCCESS) {
      console.log(customer)
      setName(customer.name ?? "");
      setIsCompany(customer.isCompany ?? "");
      setAddress(customer.address ?? "");
      setCountry(customer.country ?? "");
      setCity(customer.city ?? "");
      setDistrict(customer.district ?? "");
      setPostCode(customer.postCode ?? "");
      setPhone(customer.phone ?? "");
      setWebsite(customer.website ?? "");
      setGovernmentId(customer.governmentId ?? "");
      setIsPotantial(customer.isPotantial ?? "");
      setCurrency(customer.currency ?? "");
    }

  }, [status, onClose]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const customer = {
      id: selectedCustomerId,
      name,
      isCompany,
      address,
      country,
      city,
      district,
      postCode,
      phone,
      website,
      governmentId,
      isPotantial,
      currencyCode: currency.code,
    };

    dispatch(updateCustomer(selectedCustomerId, customer));
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Müşteri oluştur</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="name">İsim</FormLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box>
              <Checkbox
                value={isCompany}
                onChange={(e) => setIsCompany(e.target.checked)}
                defaultChecked
              >
                Şirket
              </Checkbox>
              <Checkbox
                ml="5"
                value={isPotantial}
                onChange={(e) => setIsPotantial(e.target.checked)}
                defaultChecked
              >
                Potansiyel müşteri
              </Checkbox>
            </Box>

            <Box>
              <FormLabel htmlFor="address">Adres</FormLabel>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="country">Ülke</FormLabel>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="city">İl</FormLabel>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="district">İlçe</FormLabel>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="postCode">Posta kodu</FormLabel>
              <Input
                id="postCode"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="phone">Telefon numarası</FormLabel>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 507 657 87 65"
              />
            </Box>

            <Box>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="governmentId">
                {isCompany ? "Vergi numarası" : "TC kimlik numarası"}
              </FormLabel>
              <Input
                id="governmentId"
                value={governmentId}
                onChange={(e) => setGovernmentId(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="currency">Döviz kuru</FormLabel>
              <Select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
              </Select>
            </Box>
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
  selectedCustomerId: PropTypes.number,
};

export default Update;

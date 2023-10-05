import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { setTenant } from "@/utils/tenant";

function Tenant() {
  const [Tenant, setTenantState] = useState("");

  const onChangeTenantHandler = (e) => {
    setTenantState(e.target.value);
  };

  const onSubmitHandler = () => {
    setTenant(Tenant);
    window.location.href = `http://${Tenant}.localhost:3030/login`;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Planor</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          minW={"lg"}
        >
          <Stack spacing={4}>
            <FormControl id="tenant" isRequired>
              <FormLabel>Şirket</FormLabel>
              <Flex>
                <InputGroup>
                  <Input
                    type="text"
                    value={Tenant}
                    onChange={onChangeTenantHandler}
                  />
                  <InputRightAddon>.planor.com.tr</InputRightAddon>
                </InputGroup>
              </Flex>
            </FormControl>
            <Stack spacing={5} mt={"2"}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onSubmitHandler}
              >
                Şirketini seç
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Tenant;

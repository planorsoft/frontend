import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/containers/Identity/actions";
import { getTenant } from "@/utils/tenant";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import identityTypes from "@/containers/Identity/types";

function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const identity = useSelector((state) => state.identity);

  const onChangeEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let tenant = getTenant();
    dispatch(forgotPassword(Email, tenant));
  };

  if (identity.status === identityTypes.FORGOT_PASSWORD_SUCCESS) {
    toast({
      title: "Şifre sıfırlama linki mail adresine gönderildi.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Şifrenimi unuttun?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Şifre sıfırlama linkini mail adresine göndereceğiz.
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={onChangeEmailHandler}
          />
        </FormControl>
        <Stack spacing={5}>
          <ChakraLink color={useColorModeValue("blue.400", "blue.200")} as={ReactRouterLink} to="/login">
            Giriş yap
          </ChakraLink>
          {identity.error && (
            <Alert status="error">
              <AlertIcon />
              {identity.error}
            </Alert>
          )}
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={onSubmitHandler}
          >
            Sıfırlama linkini gönder
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;

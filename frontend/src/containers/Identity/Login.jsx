import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setToken } from "@/containers/Identity/actions";
import { getTenant } from "@/utils/tenant";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import identityTypes from "@/containers/Identity/types";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const identity = useSelector((state) => state.identity);

  const onChangeEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let tenant = getTenant();
    dispatch(login(Email, Password, tenant));
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    let tenant = getTenant();
    if (!tenant) {
      navigate("/tenant");
    }
  }, []);

  useEffect(() => {
    if (identity.status == identityTypes.LOGIN_SUCCESS) {
      dispatch(setToken(identity.token));
      navigate("/dashboard");
      toast({
        title: "Giriş başarılı",
        description: "Yönlendiriliyorsunuz...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

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
            <FormControl id="email" isRequired>
              <FormLabel>Email adresi</FormLabel>
              <Input type="email" onChange={onChangeEmailHandler} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Parola</FormLabel>
              <Input type="password" onChange={onChangePasswordHandler} />
            </FormControl>
            <Stack spacing={5}>
              <ChakraLink
                color={useColorModeValue("blue.400", "blue.200")}
                as={ReactRouterLink}
                to="/forgot-password"
              >
                Şifrenimi unuttun?
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
                Giriş yap
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;

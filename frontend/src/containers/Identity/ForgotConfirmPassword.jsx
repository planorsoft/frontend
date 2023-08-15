import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotConfirmPassword } from "@/containers/Identity/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTenant } from "@/utils/tenant";
import identityTypes from "@/containers/identity/types";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";

function ForgorConfirmPassword() {
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const identity = useSelector((state) => state.identity);

  const onChangePasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onChangePasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Password !== PasswordConfirm) {
      toast({
        title: "Şifreler eşleşmiyor.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const token = searchParams.get("token").replaceAll(" ", "+");
    const email = searchParams.get("email");
    let tenant = getTenant();
    dispatch(forgotConfirmPassword(email, token, Password, tenant));
  };

  useEffect(() => {
    if (identity.status === identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS) {
      toast({
        title: "Parolanız başarıyla değiştirildi.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.loading]);

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
          Parolanı sıfırla
        </Heading>
        <FormControl id="email">
          <Input
            placeholder="Yeni parola"
            type="password"
            onChange={onChangePasswordHandler}
          />
        </FormControl>
        <FormControl id="email">
          <Input
            placeholder="Yeni parolanızı tekrar girin"
            type="password"
            onChange={onChangePasswordConfirmHandler}
          />
        </FormControl>
        <Stack spacing={5}>
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
            Sıfırla
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgorConfirmPassword;

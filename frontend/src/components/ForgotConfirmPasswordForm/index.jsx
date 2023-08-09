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
import PropTypes from "prop-types";

function ForgotConfirmPasswordForm({
  error,
  onSubmit,
  onChangePassword,
  onChangePasswordConfirm,
}) {
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
          <Input placeholder="Yeni parola" type="password" onChange={onChangePassword} />
        </FormControl>
        <FormControl id="email">
          <Input placeholder="Yeni parolanızı tekrar girin" type="password" onChange={onChangePasswordConfirm} />
        </FormControl>
        <Stack spacing={5}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={onSubmit}
          >
            Sıfırla
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

ForgotConfirmPasswordForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePasswordConfirm: PropTypes.func.isRequired,
};

export default ForgotConfirmPasswordForm;

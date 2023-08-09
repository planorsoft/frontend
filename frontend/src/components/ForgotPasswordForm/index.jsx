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
import PropTypes from "prop-types";

function ForgotPasswordForm({ error, onSubmit, onChangeEmail }) {
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
            onChange={onChangeEmail}
          />
        </FormControl>
        <Stack spacing={5}>
          <ChakraLink color={"blue.600"} as={ReactRouterLink} to="/login">
            Giriş yap
          </ChakraLink>
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
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

ForgotPasswordForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;

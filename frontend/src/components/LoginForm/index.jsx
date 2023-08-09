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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from "prop-types";

function LoginForm({ error, onSubmit, onChangeEmail, onChangePassword }) {
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
              <Input type="email" onChange={onChangeEmail} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Parola</FormLabel>
              <Input type="password" onChange={onChangePassword} />
            </FormControl>
            <Stack spacing={5}>
              <ChakraLink color={"blue.600"} as={ReactRouterLink} to='/forgot-password'>Şifrenimi unuttun?</ChakraLink>
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
                Giriş yap
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default LoginForm;

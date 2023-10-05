import {
  Center,
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Box textAlign="center" py={10} px={6}>
          <Heading display="inline-block" as="h2" size="2xl">
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Sayfa bulunamadı
          </Text>
          <Text color={useColorModeValue("gray.600", "gray.200")} mb={6}>
            Böyle bir sayfa yok veya erişim yetkin bulunmuyor.
          </Text>

          <Button
            bg={useColorModeValue("green.100", "green.600")}
            variant="solid"
            onClick={() => navigate("/")}
          >
            Eve geri dön
          </Button>
        </Box>
      </Center>
    </Flex>
  );
}

export default NotFound;

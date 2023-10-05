import { Flex, Text, Stack } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function Feature({ text, icon, iconBg }) {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
}

Feature.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    iconBg: PropTypes.string.isRequired,
}


export default Feature;

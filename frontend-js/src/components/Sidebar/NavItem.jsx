import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const NavItem = ({ icon, children, path, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeColor = useColorModeValue("cyan.200", "cyan.900");

  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => {
        navigate(path);
      }}
    >
      <Flex
        align="center"
        px="4"
        py="2"
        mx="4"
        borderRadius="sm"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("cyan.400", "cyan.700"),
          color: "white",
        }}
        bg={location.pathname === path ? activeColor : "transparent"}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiSettings,
  FiMenu,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiUsers,
  FiGrid,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const SidebarContent = ({ onClose, logo, items, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {logo}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => { navigate(path); }}
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

const MobileNav = ({ onOpen, logo, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontWeight="bold"
      >
        {logo}
      </Text>

      <HStack>
        <IconButton
          onClick={toggleColorMode}
          variant="outline"
          aria-label="open menu"
          mr="3"
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Berk Selvi</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.100", "gray.700")}
            >
              <MenuItem bg={useColorModeValue("white", "gray.900")}>
                Profil
              </MenuItem>
              <MenuDivider />
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                icon={<Icon as={PiSignOutBold} />}
                onClick={() => {
                  navigate("/logout");
                }}
              >
                Çıkış yap
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = [
    { name: "Anasayfa", icon: FiTrendingUp, path: "/" },
    { name: "Müşteriler", icon: FiUsers, path: "/customers" },
    { name: "Projeler", icon: FiGrid, path: "/projects" },
    { name: "Ayarlar", icon: FiSettings, path: "/settings" },
  ];

  const logo = "Planor";

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        logo={logo}
        items={items}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} logo={logo} items={items} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav logo={logo} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;

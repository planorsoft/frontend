import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiTrendingUp, FiSettings, FiUsers, FiGrid } from "react-icons/fi";
import PropTypes from "prop-types";
import SidebarContent from "@/components/Sidebar/SidebarContent";
import MobileNav from "@/components/Sidebar/MobileNav";


const SidebarWithHeader = ({ element }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = [
    { name: "Anasayfa", icon: FiTrendingUp, path: "/dashboard" },
    { name: "Müşteriler", icon: FiUsers, path: "/customers" },
    { name: "Potansiyeller", icon: FiUsers, path: "/customers/potential" },
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
        {element}
      </Box>
    </Box>
  );
};

SidebarWithHeader.propTypes = {
  element: PropTypes.element.isRequired,
};

export default SidebarWithHeader;

import { Box, SimpleGrid } from "@chakra-ui/react";
import { IoMdBusiness, IoLogoUsd } from "react-icons/io";
import NavItem from "@/components/Sidebar/NavItem";
import PropTypes from "prop-types";

function Settings({ selected }) {
  const menu = [
    {
      name: "Uygulama ayarları",
      icon: IoMdBusiness,
      path: "/settings/application",
    },
    {
      name: "Döviz ayarları",
      icon: IoLogoUsd,
      path: "/settings/currency",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
      <Box>
        {menu.map((item) => (
          <NavItem key={item.name} icon={item.icon} path={item.path}>
            {item.name}
          </NavItem>
        ))}
      </Box>
      <Box>{selected && selected()}</Box>
    </SimpleGrid>
  );
}

Settings.propTypes = {
  selected: PropTypes.elementType,
};

export default Settings;

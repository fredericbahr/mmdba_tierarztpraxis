import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Image,
  List,
  useColorModeValue,
} from "@chakra-ui/react";
import { Icon } from "phosphor-react";
import React from "react";

import Logo from "../../assets/logo.png";
import { NavItem } from "./NavItem";

export interface ISidebarItem {
  label: string;
  icon: Icon;
  route: string;
}

interface IProps extends BoxProps {
  items: ISidebarItem[];
  onClose: () => void;
}

export const SidebarContent = ({ items, onClose, ...rest }: IProps) => {
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
        <Image src={Logo} alt="Tierartzpraxis" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <List>
        {items.map((item, idx) => (
          <NavItem key={idx} item={item}>
            {item.label}
          </NavItem>
        ))}
      </List>
    </Box>
  );
};

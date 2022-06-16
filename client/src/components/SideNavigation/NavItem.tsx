import {
  Flex,
  FlexProps,
  Icon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { ISidebarItem } from "./SidebarContent";

interface IProps extends FlexProps {
  item: ISidebarItem;
  children: React.ReactNode;
}

export const NavItem = ({ item, children, ...rest }: IProps) => {
  return (
    <Link to={item.route}>
      <Flex
        align="center"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        <ListItem
          flex={1}
          p={4}
          display="flex"
          alignItems="center"
          _hover={{
            backgroundColor: useColorModeValue("gray.100", "gray.700"),
          }}
        >
          {item.icon && <Icon mr="4" fontSize="16" as={item.icon} />}
          {children}
        </ListItem>
      </Flex>
    </Link>
  );
};

import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { MobileNav } from "./MobileNav";
import { ISidebarItem, SidebarContent } from "./SidebarContent";

interface IProps {
  children: React.ReactNode;
  items: ISidebarItem[];
}

export const SideNavigation = ({ items, children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        items={items}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent items={items} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

import {
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react";
import { List } from "phosphor-react";
import React from "react";

import Logo from "../../assets/logo.png";

interface IProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: IProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      {...rest}
    >
      <Flex flex={1}>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<Icon as={List} />}
        />
      </Flex>

      <Image src={Logo} alt="Tierartzpraxis" />
    </Flex>
  );
};

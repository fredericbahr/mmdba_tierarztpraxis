import "./PreviewItem.css";

import {
  Box,
  CloseButton,
  Flex,
  GridItem,
  HStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  file: File;
  handleDelete: (index: number) => void;
  children: React.ReactNode;
  index: number;
}

export const PreviewItem = ({
  file,
  handleDelete,
  children,
  index,
}: IProps) => {
  return (
    <GridItem
      maxW="40"
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexWrap="wrap"
      position="relative"
      className="preview-item"
    >
      {children}
      {/* <Flex
        justifyContent="center"
        alignItems="center"
        className="preview-overlay"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backgroundColor="gray.700"
        display="none"
      >
        <Tooltip title="PDF löschen">
          <CloseButton color="white" onClick={() => handleDelete(index)} />
        </Tooltip>
      </Flex> */}
      <HStack>
        <Text wordBreak="break-all">{file.name}</Text>
        <CloseButton onClick={() => handleDelete(index)} />
      </HStack>
    </GridItem>
  );
};

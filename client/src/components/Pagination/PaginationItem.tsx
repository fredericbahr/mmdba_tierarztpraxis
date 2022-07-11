import { Button } from "@chakra-ui/react";
import React from "react";

interface IProps {
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export const PaginationItem = ({
  children,
  isActive = false,
  isDisabled = false,
  onClick,
}: IProps) => {
  return (
    <Button
      backgroundColor={isActive ? "blue.500" : "gray.200"}
      color={isActive ? "white" : "gray.800"}
      isDisabled={isDisabled}
      _hover={{
        backgroundColor: "blue.500",
        color: "white",
      }}
      onClick={() => onClick()}
    >
      {children}
    </Button>
  );
};

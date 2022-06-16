import { useToast } from "@chakra-ui/react";
import React from "react";

export const useCustomToast = () => {
  const toast = useToast();

  const showSuccessToast = (title: string, message: string) => {
    toast({
      title: title,
      description: message,
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top-right",
    });
  };

  const showErrorToast = (title: string, message: string) => {
    toast({
      title: title,
      description: message,
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top-right",
    });
  };

  return { showSuccessToast, showErrorToast };
};

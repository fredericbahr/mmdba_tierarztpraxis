import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { CustomerCreateModal } from "../../components/CustomerCreate/CustomerCreateModal/CustomerCreateModal";

export const CustomerCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Kunden anlegen</Button>
      <CustomerCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

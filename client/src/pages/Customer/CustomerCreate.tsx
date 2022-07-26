import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { CustomerCreateModal } from "../../components/CustomerCreate/CustomerCreateModal/CustomerCreateModal";
import { ICustomer } from "../../interfaces/customerInterface";

interface IProps {
  setNewCustomer: (customer: ICustomer) => void;
}

export const CustomerCreate = ({ setNewCustomer }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Kunden anlegen</Button>
      <CustomerCreateModal
        isOpen={isOpen}
        onClose={onClose}
        setNewCustomer={setNewCustomer}
      />
    </>
  );
};

import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { AnimalCreateModal } from "../../components/AnimalCreate/AnimalCreateModal/AnimalCreateModal";

export const AnimalCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Tier anlegen</Button>
      <AnimalCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

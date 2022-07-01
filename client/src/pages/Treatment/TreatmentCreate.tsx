import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { TreatmentCreateModal } from "../../components/TreatmentCreate/TreatmentCreateModal";

export const TreatmentCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Behandlung anlegen</Button>
      <TreatmentCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { MedicineCreateModal } from "../../components/MedicineCreate/MedicineCreateModal/MedicineCreateModal";

export const MedicineCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Medizin anlegen</Button>
      <MedicineCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

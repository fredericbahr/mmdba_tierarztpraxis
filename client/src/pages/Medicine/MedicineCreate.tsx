import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { MedicineCreateModal } from "../../components/MedicineCreate/MedicineCreateModal/MedicineCreateModal";
import { IMedicine } from "../../interfaces/medicineInterface";

interface IProps {
  setNewMedicine: (medicine: IMedicine) => void;
}

export const MedicineCreate = ({ setNewMedicine }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Medizin anlegen</Button>
      <MedicineCreateModal
        isOpen={isOpen}
        onClose={onClose}
        setNewMedicine={setNewMedicine}
      />
    </>
  );
};

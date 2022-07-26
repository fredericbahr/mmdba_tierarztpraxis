import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { TreatmentCreateModal } from "../../components/TreatmentCreate/TreatmentCreateModal";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  addTreatment: (treatment: ITreatment) => void;
}

export const TreatmentCreate = ({ addTreatment }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Behandlung anlegen</Button>
      <TreatmentCreateModal
        isOpen={isOpen}
        onClose={onClose}
        addTreatment={addTreatment}
      />
    </>
  );
};

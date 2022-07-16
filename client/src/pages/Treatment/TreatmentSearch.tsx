import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { TreatmentSearchModal } from "../../components/TreatmentSearch/TreatmentSearchModal/TreatmentSearchModal";

interface IProps {
  columns: string[];
}

export const TreatmentSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Behandlung suchen</Button>
      <TreatmentSearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

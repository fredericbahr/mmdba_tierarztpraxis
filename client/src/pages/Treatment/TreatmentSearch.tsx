import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { TreatmentSearchModal } from "../../components/TreatmentSearch/TreatmentSearchModal/TreatmentSearchModal";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  setSearchResults: (searchResults: ITreatment[] | null) => void;
}

export const TreatmentSearch = ({ setSearchResults }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Behandlung suchen</Button>
      <TreatmentSearchModal
        isOpen={isOpen}
        onClose={onClose}
        setSearchResults={setSearchResults}
      />
    </>
  );
};

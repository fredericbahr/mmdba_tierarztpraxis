import { Button, useDisclosure } from "@chakra-ui/react";
import React, { forwardRef, useEffect } from "react";

import TreatmentSearchModal from "../../components/TreatmentSearch/TreatmentSearchModal/TreatmentSearchModal";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  setSearchResults: (searchResults: ITreatment[] | null) => void;
}

const TreatmentSearch = ({ setSearchResults }: IProps, ref?: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ref.current = { ...ref.current, onOpen };
  });

  return (
    <>
      <Button onClick={onOpen}>Behandlung suchen</Button>
      <TreatmentSearchModal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        setSearchResults={setSearchResults}
      />
    </>
  );
};

export default forwardRef(TreatmentSearch);

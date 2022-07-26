import { Button, useDisclosure } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle } from "react";

import TreatmentSearchModal from "../../components/TreatmentSearch/TreatmentSearchModal/TreatmentSearchModal";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { ITreatmentSearchRef, ITreatmentSearchType } from "./Treatment";

interface IProps {
  searchType: ITreatmentSearchType;
  setTreatmentSearchType: (treatmentSearchType: ITreatmentSearchType) => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
}

const TreatmentSearch = (
  { searchType, setTreatmentSearchType, setSearchResults }: IProps,
  ref?: React.Ref<ITreatmentSearchRef>
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    ...(ref as React.RefObject<ITreatmentSearchRef>).current,
    onOpen,
  }));

  return (
    <>
      <Button onClick={onOpen}>Behandlung suchen</Button>
      <TreatmentSearchModal
        ref={ref}
        isOpen={isOpen}
        searchType={searchType}
        onClose={onClose}
        setTreatmentSearchType={setTreatmentSearchType}
        setSearchResults={setSearchResults}
      />
    </>
  );
};

export default forwardRef(TreatmentSearch);

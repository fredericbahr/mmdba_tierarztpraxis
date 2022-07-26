import { Button, useDisclosure } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle } from "react";

import TreatmentSearchModal from "../../components/TreatmentSearch/TreatmentSearchModal/TreatmentSearchModal";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { ITreatmentSearchQuery } from "../../interfaces/treatmentSearchInterface";
import { ITreatmentSearchRef, ITreatmentSearchType } from "./Treatment";

interface IProps {
  searchType: ITreatmentSearchType;
  filterSearchQuery: ITreatmentSearchQuery[];
  setTreatmentSearchType: (treatmentSearchType: ITreatmentSearchType) => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
  setFilterSearchQuery: (filterSearchQuery: ITreatmentSearchQuery[]) => void;
}

const TreatmentSearch = (
  {
    searchType,
    filterSearchQuery,
    setTreatmentSearchType,
    setSearchResults,
    setFilterSearchQuery,
  }: IProps,
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
        filterSearchQuery={filterSearchQuery}
        setTreatmentSearchType={setTreatmentSearchType}
        setSearchResults={setSearchResults}
        setFilterSearchQuery={setFilterSearchQuery}
      />
    </>
  );
};

export default forwardRef(TreatmentSearch);

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import { useFetch } from "../../../hooks/useFetch";
import { ITreatmentSearchQuery } from "../../../interfaces/treatmentSearchInterface";
import { TreatmentSearchGroupedQuery } from "../TreatmentSearchGroupedQuery/TreatmentSearchGroupedQuery";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TreatmentSearchModal = ({ isOpen, onClose }: IProps) => {
  const { isLoading, error, post } = useFetch();

  const [searchQuery, setSearchQuery] = useState<ITreatmentSearchQuery[]>([]);

  const handleQueryChange = (
    changedQuery: ITreatmentSearchQuery,
    idx: number
  ) => {
    const filteredSearchQuery = searchQuery.filter((_, i) => i !== idx);
    setSearchQuery([...filteredSearchQuery, changedQuery]);
  };

  const handleSearch = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Behandlung suchen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            {searchQuery.map((query, idx) => (
              <TreatmentSearchGroupedQuery
                groupedQuery={query}
                key={idx}
                onQueryChange={(newQuery) => handleQueryChange(newQuery, idx)}
              />
            ))}
          </>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSearch} isLoading={isLoading}>
            Suche
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

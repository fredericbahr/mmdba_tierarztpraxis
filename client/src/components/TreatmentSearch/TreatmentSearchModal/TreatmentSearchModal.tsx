import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import React from "react";
import { useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ITreatment } from "../../../interfaces/treatmentInterface";
import { ITreatmentSearchQuery } from "../../../interfaces/treatmentSearchInterface";
import { TreatmentSearchGroupedQuery } from "../TreatmentSearchGroupedQuery/TreatmentSearchGroupedQuery";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
}

export const TreatmentSearchModal = ({
  isOpen,
  onClose,
  setSearchResults,
}: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [searchQuery, setSearchQuery] = useState<ITreatmentSearchQuery[]>([
    {
      queries: [
        {
          field: undefined,
          condition: undefined,
          value: "",
        },
      ],
    },
  ]);

  const handleQueryChange = (
    changedQuery: ITreatmentSearchQuery,
    idx: number
  ) => {
    const mappedQuery = searchQuery.map((query, i) => {
      if (i === idx) {
        return changedQuery;
      }
      return query;
    });

    setSearchQuery(mappedQuery);
  };

  const handleQueryAdd = () => {
    setSearchQuery([
      ...searchQuery,
      {
        queries: [
          {
            field: undefined,
            condition: undefined,
            value: "",
          },
        ],
        connector: "AND",
      },
    ]);
  };

  const handleQueryRemove = (idx: number) => {
    const mappedQuery = searchQuery.filter((query, i) => i !== idx);
    setSearchQuery(mappedQuery);
  };

  const handleSearch = async () => {
    const { treatments: searchResults } = await post("/api/treatment/search", {
      searchQuery,
    });

    console.log("searchResults", searchResults, error);

    if (!searchResults && error) {
      setSearchResults(null);
      return showErrorToast("Fehler", "Fehler beim Suchen");
    }

    setSearchResults(searchResults);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Behandlung suchen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Heading as="h3">Filter</Heading>
            {searchQuery.map((query, idx) => (
              <TreatmentSearchGroupedQuery
                key={idx}
                groupedQuery={query}
                showConnector={idx !== 0}
                onQueryChange={(newQuery) => handleQueryChange(newQuery, idx)}
                onQueryRemove={() => handleQueryRemove(idx)}
              />
            ))}
            <HStack>
              <Divider />
              <Box>
                <Button leftIcon={<Icon as={Plus} />} onClick={handleQueryAdd}>
                  Hinzufügen
                </Button>
              </Box>
              <Divider />
            </HStack>
          </Stack>
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

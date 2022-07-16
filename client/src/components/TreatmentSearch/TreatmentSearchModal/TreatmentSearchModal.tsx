import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CaretDown, Plus } from "phosphor-react";
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

  const [searchQuery, setSearchQuery] = useState<ITreatmentSearchQuery[]>([
    {
      queries: [
        {
          field: "",
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
            field: "",
            condition: undefined,
            value: "",
          },
        ],
        connector: "AND",
      },
    ]);
  };

  const handleSearch = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Behandlung suchen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {searchQuery.map((query, idx) => (
              <TreatmentSearchGroupedQuery
                key={idx}
                groupedQuery={query}
                showConnector={idx !== 0}
                onQueryChange={(newQuery) => handleQueryChange(newQuery, idx)}
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

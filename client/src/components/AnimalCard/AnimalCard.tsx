import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { TrashSimple, X } from "phosphor-react";
import React, { useRef } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IAnimal } from "../../interfaces/animalInterface";
import { DeleteAlert } from "../DeleteAlert/DeleteAlert";

interface IProps {
  animal: IAnimal;
  allAnimals: IAnimal[];
  setResults: (results: any) => void;
}

export const AnimalCard = ({ animal, allAnimals, setResults }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();
  const { isLoading, error, deleteFetch } = useFetch();

  const handleDeleteRequest = async () => {
    onClose();

    const result = await deleteFetch("/api/animal/delete/" + animal.id);
    console.log(result);

    if (!result || error) {
      return showErrorToast("Fehler", "Fehler beim Löschen des Tieres");
    }

    const newAnimals = allAnimals.filter(
      (animal) => animal.id != result.deleteAnimal.id
    );
    setResults(newAnimals);
    onClose();
  };

  return (
    <>
      <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
        <VStack spacing={4} alignItems="left">
          <HStack alignItems="left">
            <Heading as="h4" size="md" width="full">
              {animal.name}
            </Heading>
            <Tooltip hasArrow label="Tier löschen">
              <IconButton
                icon={<Icon as={TrashSimple} />}
                aria-label="Löschen"
                colorScheme="red"
                variant="ghost"
                isLoading={isLoading}
                onClick={onOpen}
              />
            </Tooltip>
            <DeleteAlert
              heading="Tier löschen?"
              body="Wollen Sie das Tier wirklich löschen?"
              isLoading={isLoading}
              isOpen={isOpen}
              onClose={onClose}
              onDelete={handleDeleteRequest}
            />
          </HStack>
          <HStack
            w="full"
            justifyContent="start"
            alignItems="start"
            spacing={8}
          >
            <VStack alignItems="start">
              <Text>Geburtstag</Text>
              <Text fontSize="xs">
                {format(new Date(animal.birthdate), "dd.MM.yyyy")}
              </Text>
            </VStack>
            <VStack>
              <Text>Spezies: {animal.race?.name || "---"}</Text>
            </VStack>
            <VStack alignItems="start">
              <Text>Besitzer: {animal.owner?.name || "---"}</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

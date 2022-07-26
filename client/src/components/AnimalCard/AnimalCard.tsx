import {
  Box,
  Button,
  Heading,
  Hide,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack} from "@chakra-ui/react";
import format from "date-fns/format";
import { CaretDown, CaretUp, TrashSimple, X } from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";
import { IAnimals } from "../../interfaces/animalInterface";

interface IProps {
  animal: IAnimals;
  allAnimals: IAnimals[];
  setResults: (results: any) => void;
}

export const AnimalCard = ({ animal, allAnimals, setResults }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showCard, setVisibility] = useState(false);
  const { isLoading, error, deleteFetch } = useFetch();

  const handleDeleteRequest = async () => {
    const result = await deleteFetch("/api/animal/delete/" + animal.id);
    console.log(result);
    const newAnimals = allAnimals.filter(animal => animal.id != result.deleteAnimal.id);
    setResults(newAnimals);
    onClose();
  };

  return (
    <>
        <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full" >
          <VStack spacing={4} alignItems="left">
            <HStack alignItems="left">
              <Heading as="h4" size="md" width="full">
                {animal.name}
              </Heading>
              <IconButton
                  icon={<Icon as={TrashSimple} />}
                  aria-label="Löschen"
                  colorScheme="red"
                  variant="ghost"
                  isLoading={isLoading}
                  onClick={onOpen}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                    <ModalContent>
                      <ModalBody>
                        <Heading as="h4" size="md" p={5}>Wollen Sie das Tier wirklich löschen?</Heading>
                        <HStack alignItems="center" spacing={4} width="full" justify="center">
                          <IconButton
                            icon={<Icon as={X} />}
                            aria-label="Schließen"
                            colorScheme="blue"
                            isLoading={isLoading}
                            onClick={onClose}
                          />
                          <Button onClick={handleDeleteRequest}>Bestätigen</Button>
                        </HStack>
                      </ModalBody>
                    </ModalContent>
                </Modal>
            </HStack>
            <HStack
              w="full"
              justifyContent="start"
              alignItems="start"
              spacing={8}
            >
              <VStack>
                <Text>Geburtstag</Text>
                <Text fontSize="xs">{format(new Date(animal.birthdate), "dd.MM.yyyy")}</Text>
              </VStack>
              <VStack>
                <Text>Spezies: {animal.race.name}</Text>
              </VStack>
              <VStack alignItems="start">
                <Text>Besitzer: {animal.owner.name}</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
    </>
  );
};

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import { IAnimal } from "../../interfaces/animalInterface";
import { AnimalCard } from "../AnimalCard/AnimalCard";

interface IProps {
  animals: IAnimal[];
  isOpen: boolean;
  onClose: () => void;
  setResults: (results: any) => void;
}

export const CustomerAnimalViewModal = ({
  animals,
  isOpen,
  onClose,
  setResults,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid minChildWidth="33%" gap={8} mt={12}>
            {animals.map((animal, idx) => (
              <AnimalCard
                key={idx}
                animal={animal}
                allAnimals={animals}
                setResults={setResults}
              />
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

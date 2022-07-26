import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { AnimalCreateModal } from "../../components/AnimalCreate/AnimalCreateModal/AnimalCreateModal";
import { IAnimal } from "../../interfaces/animalInterface";

interface IProps {
  setNewAnimal: (animal: IAnimal) => void;
}

export const AnimalCreate = ({setNewAnimal}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Tier anlegen</Button>
      <AnimalCreateModal
        isOpen={isOpen}
        onClose={onClose}
        setNewAnimal={setNewAnimal}
      />
    </>
  );
};

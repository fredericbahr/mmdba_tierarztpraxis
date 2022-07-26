import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { SearchAnimalModal } from "../../components/SearchAnimal/SearchAnimalModal";
interface IProps {
  setResults: (results: any) => void;
}

export const SearchAnimals =  ({ setResults }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Tier suchen</Button>
      <SearchAnimalModal isOpen={isOpen} onClose={onClose} setResults={setResults}/>
    </>
  );
};

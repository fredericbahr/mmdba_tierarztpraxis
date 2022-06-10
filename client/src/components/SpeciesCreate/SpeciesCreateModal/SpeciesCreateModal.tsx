import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeciesCreateModal = ({ isOpen, onClose }: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [speciesName, setSpeciesName] = useState("");

  const handleSpeciesNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpeciesName(event.target.value);
  };

  const handleSpeciesCreation = async () => {
    const data = await post("/api/species", {
      name: speciesName,
    });

    if (!data || error) {
      return showErrorToast("Fehler", "Spezies konnte nicht erstellt werden");
    }

    showSuccessToast("Spezies erstellt", "Spezies wurde erfolgreich erstellt");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Spezies anlegen</ModalHeader>
        <ModalBody>
          <form>
            <FormControl isRequired>
              <FormLabel htmlFor="speciesName">Name</FormLabel>
              <Input
                type="text"
                id="speciesName"
                onChange={handleSpeciesNameChange}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button onClick={onClose} mr={4} variant="ghost">
              Abbrechen
            </Button>
            <Button isLoading={isLoading} onClick={handleSpeciesCreation}>
              Spezies anlegen
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

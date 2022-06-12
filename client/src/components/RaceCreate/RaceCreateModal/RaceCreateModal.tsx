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

export const RaceCreateModal = ({ isOpen, onClose }: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [raceName, setRaceName] = useState("");

  const handleRaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaceName(event.target.value);
  };

  const handleRaceCreation = async () => {
    const data = await post("/api/race", {
      name: raceName,
    });

    if (!data || error) {
      return showErrorToast("Fehler", "Rasse konnte nicht erstellt werden");
    }

    showSuccessToast("Rasse erstellt", "Rasse wurde erfolgreich erstellt");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rasse anlegen</ModalHeader>
        <ModalBody>
          <form>
            <FormControl isRequired>
              <FormLabel htmlFor="raceName">Name</FormLabel>
              <Input
                type="text"
                id="raceName"
                onChange={handleRaceNameChange}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button onClick={onClose} mr={4} variant="ghost">
              Abbrechen
            </Button>
            <Button isLoading={isLoading} onClick={handleRaceCreation}>
              Rasse anlegen
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

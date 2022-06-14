import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ISpeciesOption } from "../../../interfaces/autocompleteOptionInterfaces";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RaceCreateModal = ({ isOpen, onClose }: IProps) => {
  const { isLoading, error, post } = useFetch();
  const {
    isLoading: speciesLoading,
    error: speciesError,
    get: getSpecies,
  } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [raceName, setRaceName] = useState("");
  const [speciesId, setSpeciesId] = useState<number | undefined>(undefined);
  const [speciesOptions, setSpeciesOption] = useState<ISpeciesOption[]>([]);

  const handleRaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaceName(event.target.value);
  };

  const handleSpeciesChange = (value: number) => {
    setSpeciesId(value);
  };

  const handleRaceCreation = async () => {
    const data = await post("/api/race", {
      name: raceName,
      speciesId,
    });

    if (!data || error) {
      return showErrorToast("Fehler", "Rasse konnte nicht erstellt werden");
    }

    showSuccessToast("Rasse erstellt", "Rasse wurde erfolgreich erstellt");
    onClose();
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      const { species } = await getSpecies("/api/species");

      if (!species || speciesError) {
        return showErrorToast("Fehler", "Spezies konnten nicht geladen werden");
      }

      setSpeciesOption(species);
    };

    fetchSpecies();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rasse anlegen</ModalHeader>
        <ModalBody>
          <form>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="raceName">Name</FormLabel>
                <Input
                  type="text"
                  id="raceName"
                  onChange={handleRaceNameChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Species der Rasse</FormLabel>
                <AutoComplete openOnFocus onChange={handleSpeciesChange}>
                  <InputGroup>
                    <AutoCompleteInput variant="filled" />
                    <InputRightElement>
                      {speciesLoading && <Spinner />}
                    </InputRightElement>
                  </InputGroup>
                  <AutoCompleteList>
                    {speciesOptions.map((option, cid) => (
                      <AutoCompleteItem
                        key={`option-${cid}`}
                        label={option.name}
                        getValue={(option) => `${option.id}`}
                        value={option}
                      >
                        {option.name}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
                <FormHelperText>Wählen Sie bitte eine Spezies</FormHelperText>
              </FormControl>
            </VStack>
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

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ISpeciesOption } from "../../../interfaces/autocompleteOptionInterfaces";
import { ISelectOptions } from "../../../interfaces/selectInterface";

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
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [speciesOptions, setSpeciesOptions] = useState<
    ISelectOptions<number>[]
  >([]);

  const handleRaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaceName(event.target.value);
  };

  const handleSpeciesChange = (selected?: ISelectOptions<number> | null) => {
    setSpeciesId(selected?.value ?? null);
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

      if (species && !error) {
        const speciesOptions: ISelectOptions<number>[] = species.map(
          (species: ISpeciesOption) => ({
            value: species.id,
            label: species.name,
          })
        );

        setSpeciesOptions(speciesOptions);
      }
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
                <Select
                  isClearable
                  isSearchable
                  isLoading={speciesLoading}
                  options={speciesOptions}
                  value={speciesOptions.find(
                    (option) => option.value === speciesId
                  )}
                  onChange={handleSpeciesChange}
                />
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

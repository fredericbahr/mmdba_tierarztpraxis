import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightElement,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useEffect } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ISpeciesOption } from "../../../interfaces/autocompleteOptionInterfaces";
import { SpeciesCreateModal } from "../../SpeciesCreate/SpeciesCreateModal/SpeciesCreateModal";

interface IProps {
  onSpeciesChange: (value: number) => void;
}

export const AnimalSpeziesChooseStep = ({ onSpeciesChange }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISpeciesOption[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { species } = await get("/api/species");

      if (!species || error) {
        showErrorToast("Fehler", "Fehler beim Laden der Spezien");
      }

      if (species && !error) {
        console.log(species);
        setOptions(species);
      }
    };

    if (!isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  return (
    <>
      <VStack justify="center" align="center" w="full" spacing={8}>
        <FormControl w="60">
          <FormLabel>Tierspezies</FormLabel>
          <AutoComplete openOnFocus onChange={onSpeciesChange}>
            <InputGroup>
              <AutoCompleteInput variant="filled" />
              <InputRightElement>{isLoading && <Spinner />}</InputRightElement>
            </InputGroup>
            <AutoCompleteList>
              {options.map((option, cid) => (
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
          <FormHelperText>Wählen Sie bitte einen Tierspezies</FormHelperText>
        </FormControl>
        <Button onClick={onOpen}>Spezies anlegen</Button>
      </VStack>
      <SpeciesCreateModal isOpen={isOpen} onClose={onClose} />;
    </>
  );
};

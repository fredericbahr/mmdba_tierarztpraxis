import {
  Button,
  Flex,
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
import { IRaceOption } from "../../../interfaces/autocompleteOptionInterfaces";

interface IProps {
  speciesId: number | null;
  onRaceChange: (value: number) => void;
}

export const AnimalRaceChooseStep = ({ speciesId, onRaceChange }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<IRaceOption[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { races } = await get(`/api/races/${speciesId}`);

      if (!races || error) {
        showErrorToast("Fehler", "Fehler beim Laden der Rassen");
      }

      if (races && !error) {
        setOptions(races);
      }
    };

    fetchOptions();
  }, []);

  return (
    <VStack justify="center" align="center" w="full" spacing={8}>
      <FormControl w="60">
        <FormLabel>Tierrasse</FormLabel>
        <AutoComplete openOnFocus onChange={onRaceChange}>
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
        <FormHelperText>Wählen Sie bitte einen Tierrasse</FormHelperText>
      </FormControl>
      <Button onClick={onOpen}>Rasse anlegen</Button>
    </VStack>
  );
  // TODO: Add Race Create Modal
};

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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

import { useFetch } from "../../../hooks/useFetch";
import { IRaceOption } from "../../../interfaces/autocompleteOptionInterfaces";

interface IProps {
  onSpeciesChange: (value: number) => void;
}

export const AnimalSpeziesChooseStep = ({ onSpeciesChange }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [options, setOptions] = React.useState<IRaceOption[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await get("/api/species");

      if (fetchedOptions && !error) {
        setOptions(fetchedOptions);
      }
    };

    fetchOptions();
  }, []);

  return (
    <VStack justify="center" align="center" w="full" spacing={8}>
      <FormControl w="60">
        <FormLabel>Tierspezies</FormLabel>
        <AutoComplete openOnFocus onChange={onSpeciesChange}>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            <>
              {isLoading && (
                <Flex justifyContent="center" alignItems="center">
                  <Spinner />
                </Flex>
              )}
              {!isLoading &&
                options.map((option, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    getValue={(option) => option.id}
                    label={option.name}
                    value={option}
                    textTransform="capitalize"
                  >
                    {option.name}
                  </AutoCompleteItem>
                ))}
            </>
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Wählen Sie bitte einen Tierspezies</FormHelperText>
      </FormControl>
      <Button onClick={onOpen}>Spezies anlegen</Button>
    </VStack>
  );
  // TODO: Add Spezies Create Modal
};

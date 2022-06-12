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
import { ICustomerOption } from "../../../interfaces/autocompleteOptionInterfaces";
import { CustomerCreateModal } from "../../CustomerCreate/CustomerCreateModal/CustomerCreateModal";

interface IProps {
  onCustomerChange: (value: number) => void;
}

export const AnimalCustomerChooseStep = ({ onCustomerChange }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ICustomerOption[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { customers } = await get("/api/customers");

      if (!customers || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der Besitzer");
      }

      if (customers && !error) {
        console.log(customers);
        setOptions(customers);
      }
    };

    fetchOptions();
  }, []);

  return (
    <>
      <VStack justify="center" align="center" w="full" spacing={8}>
        <FormControl w="60">
          <FormLabel>Tierbesitzer</FormLabel>
          <AutoComplete openOnFocus onChange={onCustomerChange}>
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
          <FormHelperText>Wählen Sie bitte einen Besitzer</FormHelperText>
        </FormControl>
        <Button onClick={onOpen}>Besitzer anlegen</Button>
      </VStack>
      <CustomerCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

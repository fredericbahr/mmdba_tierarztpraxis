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
import { ICustomerOption } from "../../../interfaces/autocompleteOptionInterfaces";
import { CustomerCreateModal } from "../../CustomerCreate/CustomerCreateModal/CustomerCreateModal";

interface IProps {
  onCustomerChange: (value: number) => void;
}

export const AnimalCustomerChooseStep = ({ onCustomerChange }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [options, setOptions] = React.useState<ICustomerOption[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await get("/api/customers");

      if (fetchedOptions && !error) {
        setOptions(fetchedOptions);
      }
    };

    fetchOptions();
  }, []);

  return (
    <>
      <VStack justify="center" align="center" w="full" spacing={8}>
        <FormControl w="60">
          <FormLabel>Tierbesitzer</FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              variant="filled"
              onChange={() => onCustomerChange}
            />
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
                      value={option.id}
                      textTransform="capitalize"
                    >
                      <Flex justifyContent="center" alignItems="center">
                        <Spinner />
                      </Flex>
                      {option.name}
                    </AutoCompleteItem>
                  ))}
              </>
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

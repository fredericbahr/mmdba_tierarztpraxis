import {
  FormControl,
  FormHelperText,
  FormLabel,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Select from "react-select";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ICustomerOption } from "../../interfaces/autocompleteOptionInterfaces";
import { ISelectOptions } from "../../interfaces/selectInterface";

interface IProps {
  customerId: number | null;
  onCustomerChange: (selected?: ISelectOptions<number> | null) => void;
}

export const SearchCustomerStep = ({
  customerId,
  onCustomerChange,
}: IProps) => {
  const { isOpen } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISelectOptions<number>[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { customers } = await get("/api/customers");

      if (!customers || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der Besitzer");
      }

      if (customers && !error) {
        const customerOptions: ISelectOptions<number>[] = customers.map(
          (customer: ICustomerOption) => ({
            value: customer.id,
            label: customer.name,
          })
        );

        setOptions(customerOptions);
      }
    };

    if (!isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  return (
    <>
      <VStack justify="center" align="center" w="full" spacing={8}>
        <FormControl w="sm">
          <FormLabel>Tierbesitzer</FormLabel>
          <Select
            isClearable
            isSearchable
            isLoading={isLoading}
            options={options}
            value={options.find((option) => option.value === customerId)}
            onChange={onCustomerChange}
          />
          <FormHelperText>Wählen Sie bitte einen Besitzer</FormHelperText>
        </FormControl>
      </VStack>
    </>
  );
};

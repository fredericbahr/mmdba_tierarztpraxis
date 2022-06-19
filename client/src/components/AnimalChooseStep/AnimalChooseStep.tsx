import {
  Button,
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
import { IAnimalOption } from "../../interfaces/autocompleteOptionInterfaces";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { AnimalCreateModal } from "../AnimalCreate/AnimalCreateModal/AnimalCreateModal";

interface IProps {
  animalId: number | null;
  customerId?: number | null;
  onAnimalChange: (selected?: ISelectOptions<number> | null) => void;
}

export const AnimalChooseStep = ({
  animalId,
  customerId = null,
  onAnimalChange,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISelectOptions<number>[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { animals } = customerId
        ? await get(`/api/animals/${customerId}`)
        : await get("/api/animals");

      if (!animals || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der Tiere");
      }

      if (animals && !error) {
        const animalOptions: ISelectOptions<number>[] = animals.map(
          (animal: IAnimalOption) => ({
            value: animal.id,
            label: animal.name,
          })
        );

        setOptions(animalOptions);
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
          <FormLabel>Tier</FormLabel>
          <Select
            isClearable
            isSearchable
            isLoading={isLoading}
            options={options}
            value={options.find((option) => option.value === animalId)}
            onChange={onAnimalChange}
          />
          <FormHelperText>Wählen Sie bitte ein Tier</FormHelperText>
        </FormControl>
        <Button onClick={onOpen}>Tier anlegen</Button>
      </VStack>
      <AnimalCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

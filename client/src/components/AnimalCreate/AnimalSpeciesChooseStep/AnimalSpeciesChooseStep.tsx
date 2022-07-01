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

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ISpeciesOption } from "../../../interfaces/autocompleteOptionInterfaces";
import { ISelectOptions } from "../../../interfaces/selectInterface";
import { SpeciesCreateModal } from "../../SpeciesCreate/SpeciesCreateModal/SpeciesCreateModal";

interface IProps {
  speciesId: number | null;
  onSpeciesChange: (selected?: ISelectOptions<number> | null) => void;
}

export const AnimalSpeziesChooseStep = ({
  speciesId,
  onSpeciesChange,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISelectOptions<number>[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { species } = await get("/api/species");

      if (!species || error) {
        showErrorToast("Fehler", "Fehler beim Laden der Spezien");
      }

      if (species && !error) {
        const speciesOptions: ISelectOptions<number>[] = species.map(
          (species: ISpeciesOption) => ({
            value: species.id,
            label: species.name,
          })
        );

        setOptions(speciesOptions);
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
          <FormLabel>Tierspezies</FormLabel>
          <Select
            isClearable
            isSearchable
            isLoading={isLoading}
            options={options}
            value={options.find((option) => option.value === speciesId)}
            onChange={onSpeciesChange}
            placeholder="Spezies auswählen..."
            loadingMessage={() => "Lade Spezies..."}
          />
          <FormHelperText>Wählen Sie bitte einen Tierspezies</FormHelperText>
        </FormControl>
        <Button onClick={onOpen}>Spezies anlegen</Button>
      </VStack>
      <SpeciesCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

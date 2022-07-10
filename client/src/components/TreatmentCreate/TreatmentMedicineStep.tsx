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
import { IMedicineOption } from "../../interfaces/autocompleteOptionInterfaces";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { MedicineCreateModal } from "../MedicineCreate/MedicineCreateModal/MedicineCreateModal";

interface IProps {
  medicineId: number | null;
  onMedicineChange: (selected?: ISelectOptions<number> | null) => void;
}

export const TreatmentMedicineStep = ({
  medicineId,
  onMedicineChange,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISelectOptions<number>[]>([]);
  const { isLoading, error, get } = useFetch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { medicines } = await get("/api/medicines");

      if (!medicines || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der Medizin");
      }

      if (medicines && !error) {
        const medicineOptions: ISelectOptions<number>[] = medicines.map(
          (medicine: IMedicineOption) => ({
            value: medicine.id,
            label: medicine.name,
          })
        );

        setOptions(medicineOptions);
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
          <FormLabel>Medizin</FormLabel>
          <Select
            isClearable
            isSearchable
            isLoading={isLoading}
            options={options}
            value={options.find((option) => option.value === medicineId)}
            onChange={onMedicineChange}
            loadingMessage={() => "Lade Medizin..."}
            placeholder="Medizin auswählen..."
          />
          <FormHelperText>Wählen Sie bitte eine Medizin</FormHelperText>
        </FormControl>
        <Button onClick={onOpen}>Medizin anlegen</Button>
      </VStack>
      <MedicineCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

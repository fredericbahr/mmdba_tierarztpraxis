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
import { IMedicine } from "../../interfaces/medicineInterface";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { MedicineChooseModal } from "../MedicineChooseModal/MedicineChooseModal";
import { MedicineCreateModal } from "../MedicineCreate/MedicineCreateModal/MedicineCreateModal";

interface IProps {
  medicineId: number | null;
  onMedicineChange: (selected?: ISelectOptions<number> | null) => void;
}

export const TreatmentMedicineStep = ({
  medicineId,
  onMedicineChange,
}: IProps) => {
  const {
    isOpen: isOpenMedicineChooseModal,
    onOpen: onOpenMedicineChooseModal,
    onClose: onCloseMedicineChooseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenMedicineCreateModal,
    onOpen: onOpenMedicineCreateModal,
    onClose: onCloseMedicineCreateModal,
  } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const [options, setOptions] = React.useState<ISelectOptions<number>[]>([]);
  const { isLoading, error, get } = useFetch();

  const handleMedicineChoose = (medicine: IMedicine | null) => {
    if (medicine) {
      return onMedicineChange({ value: medicine.id, label: medicine.name });
    }

    onMedicineChange(null);
  };

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

    if (!isOpenMedicineCreateModal) {
      fetchOptions();
    }
  }, [isOpenMedicineCreateModal]);

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
        <Button onClick={onOpenMedicineChooseModal} variant="ghost">
          Erweiterte Suche
        </Button>
        <Button onClick={onOpenMedicineCreateModal}>Medizin anlegen</Button>
      </VStack>
      <MedicineCreateModal
        isOpen={isOpenMedicineCreateModal}
        onClose={onCloseMedicineCreateModal}
      />
      <MedicineChooseModal
        isOpen={isOpenMedicineChooseModal}
        onClose={onCloseMedicineChooseModal}
        setSelectedMedicine={handleMedicineChoose}
      />
    </>
  );
};

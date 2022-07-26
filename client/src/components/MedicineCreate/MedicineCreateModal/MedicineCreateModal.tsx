import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { IMedicine } from "../../../interfaces/medicineInterface";
import { IStep } from "../../../interfaces/stepInterface";
import { MedicineCreateStep } from "../MedicineCreateStep/MedicineCreateStep";
import { MedicineDescriptionUpload } from "../MedicineDescriptionUpload/MedicineDescriptionUpload";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setNewMedicine: (medicine: IMedicine) => void;
}

export const MedicineCreateModal = ({
  isOpen,
  onClose,
  setNewMedicine,
}: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { isLoading, error, uploadFormData } = useFetch();

  const [medicineName, setMedicineName] = useState("");
  const [medicineDosis, setMedicineDosis] = useState<number | null>(null);
  const [medicineDescription, setMedicineDescription] = useState<File | null>(
    null
  );

  const handleMedicineNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicineName(event.target.value);
  };

  const handleMedicineDosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dosis = event.target.value;
    setMedicineDosis(dosis ? Number(dosis) : null);
  };

  const handleMedicineDescriptionChange = (file: File | null) => {
    setMedicineDescription(file);
  };

  const handleReset = () => {
    reset();
    setMedicineName("");
    setMedicineDosis(null);
    setMedicineDescription(null);
  };

  /**
   * Handles the creation of the animal
   */
  const handleMedicineCreation = async () => {
    const formData = new FormData();
    formData.append("name", medicineName);
    formData.append("dosis", (medicineDosis ?? "").toString());
    formData.append("medicine-files", medicineDescription ?? "");

    const { medicine } = await uploadFormData("/api/medicine", formData);

    if (!medicine || error) {
      return showErrorToast("Fehler", error || "Es ist ein Fehler aufgetreten");
    }

    showSuccessToast("Erfolg", "Medizin erfolgreich angelegt");
    setNewMedicine(medicine);

    onClose();
  };

  const steps: IStep[] = [
    {
      label: "Medizin anlegen",
      content: (
        <MedicineCreateStep
          medicineName={medicineName}
          medicineDosis={medicineDosis}
          onMedicineNameChange={handleMedicineNameChange}
          onMedicineDosisChange={handleMedicineDosisChange}
        />
      ),
    },
    {
      label: "Beschreibung hochladen",
      content: (
        <MedicineDescriptionUpload
          file={medicineDescription}
          onFileChange={handleMedicineDescriptionChange}
        />
      ),
    },
  ];

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex flexDir="column" marginTop={4}>
            <Steps
              colorScheme="blue"
              activeStep={activeStep}
              justifyContent="start"
              flexWrap="wrap"
            >
              {steps.map(({ label, content }) => (
                <Step label={label} key={label}>
                  <Box marginTop={4}>{content}</Box>
                </Step>
              ))}
            </Steps>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button
              mr={4}
              onClick={activeStep === 0 ? onClose : prevStep}
              variant="ghost"
            >
              {activeStep === 0 ? "Abbrechen" : "Zurück"}
            </Button>
            <Button
              onClick={
                activeStep === steps.length - 1
                  ? handleMedicineCreation
                  : nextStep
              }
              isLoading={isLoading}
              disabled={activeStep >= steps.length}
            >
              {activeStep === steps.length - 1 ? "Medizin anlegen" : "Weiter"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

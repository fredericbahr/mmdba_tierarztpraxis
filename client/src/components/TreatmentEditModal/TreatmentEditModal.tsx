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

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { IStep } from "../../interfaces/stepInterface";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { AnimalChooseStep } from "../AnimalChooseStep/AnimalChooseStep";
import { CustomerChooseStep } from "../CustomerChooseStep/CustomerChooseStep";
import { TreatmentCreateStep } from "../TreatmentCreate/TreatmentCreateStep";
import { TreatmentDocumentationUploadStep } from "../TreatmentCreate/TreatmentDocumentationUploadStep";
import { TreatmentMedicineStep } from "../TreatmentCreate/TreatmentMedicineStep";

interface IProps {
  treatment: ITreatment;
  isOpen: boolean;
  onClose: () => void;
  setUpdatedTreatment: (treatment: ITreatment) => void;
}

export const TreatmentEditModal = ({
  treatment,
  isOpen,
  onClose,
  setUpdatedTreatment,
}: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { isLoading, error, uploadFormData } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const getFiles = (treatment: ITreatment) => {
    console.log("treatment", treatment);
    const generatedFiles = [
      ...treatment.photos.map((photo, index) => {
        return new File([photo.blob], `photo${index + 1}`, {
          type: photo.mimeType,
        });
      }),
      ...treatment.videos.map((video, index) => {
        return new File([video.blob], `video${index + 1}`, {
          type: video.mimeType,
        });
      }),
      ...treatment.findings.map((finding, index) => {
        return new File([finding.blob], `finding${index + 1}`, {
          type: "application/pdf",
        });
      }),
    ];

    return generatedFiles;
  };

  const [treatmentDiagnosis, setTreatmentDiagnosis] = useState(
    treatment.diagnosis
  );
  const [treatmentNotes, setTreatmentNotes] = useState(treatment.notes);
  const [treatmentPrice, setTreatmentPrice] = useState(treatment.costs);
  const [treatmentDate, setTreatmentDate] = useState<Date | null>(
    new Date(treatment.date)
  );
  const [customerId, setCustomerId] = useState<number | null>(
    treatment.customer?.id || null
  );
  const [animalId, setAnimalId] = useState<number | null>(
    treatment.animal?.id || null
  );
  const [medicineId, setMedicineId] = useState<number | null>(
    treatment.medicines[0]?.id || null
  );
  const [files, setFiles] = useState<File[]>(getFiles(treatment));

  const handleTreatmentDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreatmentDiagnosis(event.target.value);
  };

  const handleTreatmentNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTreatmentNotes(event.target.value);
  };

  const handleTreatmentPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreatmentPrice(Number(event.target.value));
  };

  const handleTreatmentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreatmentDate(new Date(event.target.value));
  };

  const handleCustomerChange = (selected?: ISelectOptions<number> | null) => {
    setCustomerId(selected?.value ?? null);
  };

  const handleAnimalChange = (selected?: ISelectOptions<number> | null) => {
    setAnimalId(selected?.value ?? null);
  };

  const handleMedicineChange = (selected?: ISelectOptions<number> | null) => {
    setMedicineId(selected?.value ?? null);
  };

  const handleFilesChange = (files: File[]) => {
    setFiles(files);
  };

  const handleTreatmentUpdate = async () => {
    const formData = new FormData();
    formData.append("diagnosis", treatmentDiagnosis);
    formData.append("notes", treatmentNotes);
    formData.append("costs", treatmentPrice.toString());
    formData.append("date", (treatmentDate ?? "").toString());
    formData.append("customerId", (customerId ?? "").toString());
    formData.append("animalId", (animalId ?? "").toString());
    formData.append("medicineId", (medicineId ?? "").toString());

    files.forEach((file) => {
      formData.append("treatment-files", file);
    });

    const { treatment: updatedTreatment } = await uploadFormData(
      `/api/treatment/edit/${treatment.id}`,
      formData
    );

    if (!updatedTreatment || error) {
      return showErrorToast(
        "Fehler",
        "Behandlung konnte nicht geändert werden"
      );
    }

    showSuccessToast(
      "Behandlung erstellt",
      "Behandlung wurde erfolgreich geändert"
    );
    setUpdatedTreatment(updatedTreatment);
    onClose();
  };

  const steps: IStep[] = [
    {
      label: "Behandlung anlegen",
      content: (
        <TreatmentCreateStep
          treatmentDiagnosis={treatmentDiagnosis}
          treatmentNotes={treatmentNotes}
          treatmentPrice={treatmentPrice}
          treatmentDate={treatmentDate}
          onTreatmentDiagnosisChange={handleTreatmentDiagnosisChange}
          onTreatmentNotesChange={handleTreatmentNotesChange}
          onTreatmentPriceChange={handleTreatmentPriceChange}
          onTreatmentDateChange={handleTreatmentDateChange}
        />
      ),
    },
    {
      label: "Besitzer auswählen",
      content: (
        <CustomerChooseStep
          customerId={customerId}
          onCustomerChange={handleCustomerChange}
        />
      ),
    },
    {
      label: "Tier auswählen",
      content: (
        <AnimalChooseStep
          animalId={animalId}
          customerId={customerId}
          onAnimalChange={handleAnimalChange}
        />
      ),
    },
    {
      label: "Dokumentation hochladen",
      content: (
        <TreatmentDocumentationUploadStep
          files={files}
          onFilesChange={handleFilesChange}
        />
      ),
    },
    {
      label: "Medikament verschreiben",
      content: (
        <TreatmentMedicineStep
          medicineId={medicineId}
          onMedicineChange={handleMedicineChange}
        />
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody minH="50vh">
          <Flex flexDir="column" marginTop={4}>
            <Steps
              colorScheme="blue"
              activeStep={activeStep}
              justifyContent="start"
              flexWrap="wrap"
            >
              {steps.map(({ label, content }) => (
                <Step label={label} key={label} my={2}>
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
                  ? handleTreatmentUpdate
                  : nextStep
              }
              isLoading={isLoading}
              disabled={activeStep >= steps.length}
            >
              {activeStep === steps.length - 1 ? "Behandlung ändern" : "Weiter"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

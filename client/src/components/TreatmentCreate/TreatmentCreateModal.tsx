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
import React from "react";

import { useFetch } from "../../hooks/useFetch";
import { IStep } from "../../interfaces/stepInterface";
import { TreatmentCreateStep } from "./TreatmentCreateStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TreatmentCreateModal = ({ isOpen, onClose }: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { isLoading, error, post } = useFetch();

  const [treatmentDiagnosis, setTreatmentDiagnosis] = React.useState("");
  const [treatmentNotes, setTreatmentNotes] = React.useState("");
  const [treatmentPrice, setTreatmentPrice] = React.useState(0);
  const [treatmentDate, setTreatmentDate] = React.useState<Date | null>(null);

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

  const handleTreatmentCreate = () => {
    console.log("TreatmentCreateModal.handleTreatmentCreate");
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
  ];

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
                  ? handleTreatmentCreate
                  : nextStep
              }
              isLoading={isLoading}
              disabled={activeStep >= steps.length}
            >
              {activeStep === steps.length - 1
                ? "Behandlung anlegen"
                : "Weiter"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useEffect, useState } from "react";

import { IMedicine } from "../../interfaces/medicineInterface";
import { IStep } from "../../interfaces/stepInterface";
import { MedicineChooseStep } from "./MedicineChooseStep";
import { MedicineSearchStep } from "./MedicineSearchStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedMedicine: (medicine: IMedicine | null) => void;
}

export const MedicineChooseModal = ({
  isOpen,
  onClose,
  setSelectedMedicine,
}: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [medicines, setMedicines] = useState<IMedicine[]>([]);

  const handleReset = () => {
    reset();
    setMedicines([]);
    onClose();
  };

  const steps: IStep[] = [
    {
      label: "Medikamenten suchen",
      content: <MedicineSearchStep setResults={setMedicines} />,
    },
    {
      label: "Medikamente auswählen",
      content: (
        <MedicineChooseStep
          medicines={medicines}
          setSelectedMedicine={setSelectedMedicine}
          onClose={handleReset}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeStep === 0 && medicines.length > 0) {
      nextStep();
    }
  }, [medicines]);

  return (
    <Modal isOpen={isOpen} onClose={handleReset} size="6xl" isCentered>
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
                <Step label={label} key={label} my={2}>
                  <Box marginTop={4}>{content}</Box>
                </Step>
              ))}
            </Steps>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={4}
            onClick={activeStep === 0 ? handleReset : prevStep}
            variant="ghost"
          >
            {activeStep === 0 ? "Abbrechen" : "Zurück"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

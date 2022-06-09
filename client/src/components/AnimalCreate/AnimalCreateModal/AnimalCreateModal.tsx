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
import React, { useState } from "react";

import { AnimalCreateStep } from "../AnimalCreateStep/AnimalCreateStep";
import { AnimalCreateSuccess } from "../AnimalCreateSuccess/AnimalCreateSuccess";
import { AnimalCustomerChooseStep } from "../AnimalCustomerChooseStep/AnimalCustomerChooseStep";
import { AnimalRaceChooseStep } from "../AnimalRaceChooseStep/AnimalRaceChooseStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnimalCreateModal = ({ isOpen, onClose }: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [animalName, setAnimalName] = useState("");
  const [animalBirthYear, setAnimalBirthYear] = useState<Date | null>(null);
  const [animalWeight, setAnimalWeight] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);

  const handleAnimalNameChange = (value: string) => {
    setAnimalName(value);
  };

  const handleAnimalBirthYearChange = (value: Date) => {
    setAnimalBirthYear(value);
  };

  const handleAnimalWeightChange = (value: number) => {
    setAnimalWeight(value);
  };

  const handleCustomerIdChange = (value: number) => {
    setCustomerId(value);
  };

  const handleSpeciesChange = (value: number) => {
    setSpeciesId(value);
  };

  const handleRaceIdChange = (value: number) => {
    setRaceId(value);
  };

  /**
   * Handles the creation of the animal
   */
  const handleAnimalCreation = () => {
    nextStep();
  };

  const steps = [
    {
      label: "Tier anlegen",
      content: (
        <AnimalCreateStep
          onAnimalNameChange={handleAnimalNameChange}
          onAnimalBirthYearChange={handleAnimalBirthYearChange}
          onAnimalWeightChange={handleAnimalWeightChange}
        />
      ),
    },
    {
      label: "Besitzer auswählen",
      content: (
        <AnimalCustomerChooseStep onCustomerChange={handleCustomerIdChange} />
      ),
    },
    {
      label: "Spezies auswählen",
      content: <AnimalCreateStep />,
    },
    {
      label: "Rasse auswählen",
      content: (
        <AnimalRaceChooseStep
          onRaceChange={handleRaceIdChange}
          speciesId={speciesId}
        />
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
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
            <Flex marginTop={4}>
              {activeStep === steps.length && (
                <Flex px={4} py={4} width="100%" flexDirection="column">
                  <AnimalCreateSuccess />
                  <Button mx="auto" mt={6} size="sm" onClick={reset}>
                    Reset
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              variant="ghost"
            >
              Zurück
            </Button>
            <Button
              onClick={
                activeStep === steps.length - 1
                  ? handleAnimalCreation
                  : nextStep
              }
              disabled={activeStep >= steps.length}
            >
              {activeStep === steps.length - 1 ? "Tier anlegen" : "Weiter"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

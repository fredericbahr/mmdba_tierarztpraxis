import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { AnimalCreateStep } from "../AnimalCreateStep/AnimalCreateStep";
import { AnimalCustomerChooseStep } from "../AnimalCustomerChooseStep/AnimalCustomerChooseStep";
import { AnimalRaceChooseStep } from "../AnimalRaceChooseStep/AnimalRaceChooseStep";
import { AnimalSpeziesChooseStep } from "../AnimalSpeciesChooseStep/AnimalSpeciesChooseStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnimalCreateModal = ({ isOpen, onClose }: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { showErrorToast } = useCustomToast();
  const { isLoading, error, post } = useFetch();

  const [animalName, setAnimalName] = useState("");
  const [animalBirthdate, setAnimalBirthdate] = useState<Date | null>(null);
  const [animalWeight, setAnimalWeight] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);

  const handleAnimalNameChange = (value: string) => {
    setAnimalName(value);
  };

  const handleAnimalBirthYearChange = (value: Date) => {
    setAnimalBirthdate(value);
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
  const handleAnimalCreation = async () => {
    const body = {
      name: animalName,
      birthdate: animalBirthdate,
      weight: animalWeight,
      customerId: customerId,
      raceId: raceId,
    };

    const data = await post("/animals", body);

    if (error || !data) {
      return showErrorToast(
        "Fehler",
        error || "Fehler beim Erstellen des Tieres"
      );
    }

    onClose();
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
      content: (
        <AnimalSpeziesChooseStep onSpecieschange={handleSpeciesChange} />
      ),
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
              isLoading={isLoading}
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

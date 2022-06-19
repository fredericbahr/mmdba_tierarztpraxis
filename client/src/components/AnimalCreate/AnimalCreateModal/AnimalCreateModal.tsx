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
import { ISelectOptions } from "../../../interfaces/selectInterface";
import { IStep } from "../../../interfaces/stepInterface";
import { CustomerChooseStep } from "../../CustomerChooseStep/CustomerChooseStep";
import { AnimalCreateStep } from "../AnimalCreateStep/AnimalCreateStep";
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

  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { isLoading, error, post } = useFetch();

  const [animalName, setAnimalName] = useState("");
  const [animalBirthdate, setAnimalBirthdate] = useState<Date | null>(null);
  const [animalWeight, setAnimalWeight] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);

  const handleAnimalNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnimalName(event.target.value);
  };

  const handleAnimalBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnimalBirthdate(new Date(event.target.value));
  };

  const handleAnimalWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnimalWeight(Number(event.target.value));
  };

  const handleCustomerIdChange = (selected?: ISelectOptions<number> | null) => {
    setCustomerId(selected?.value ?? null);
  };

  const handleSpeciesIdChange = (selected?: ISelectOptions<number> | null) => {
    setSpeciesId(selected?.value ?? null);
  };

  const handleRaceIdChange = (selected?: ISelectOptions<number> | null) => {
    setRaceId(selected?.value ?? null);
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

    const data = await post("/api/animal", body);

    if (error || !data) {
      return showErrorToast(
        "Fehler",
        error || "Fehler beim Erstellen des Tieres"
      );
    }

    showSuccessToast("Erfolgreich", "Tiere wurden erfolgreich erstellt");

    onClose();
  };

  const steps: IStep[] = [
    {
      label: "Tier anlegen",
      content: (
        <AnimalCreateStep
          animalName={animalName}
          animalBirthdate={animalBirthdate}
          animalWeight={animalWeight}
          onAnimalNameChange={handleAnimalNameChange}
          onAnimalBirthdateChange={handleAnimalBirthdateChange}
          onAnimalWeightChange={handleAnimalWeightChange}
        />
      ),
    },
    {
      label: "Besitzer auswählen",
      content: (
        <CustomerChooseStep
          customerId={customerId}
          onCustomerChange={handleCustomerIdChange}
        />
      ),
    },
    {
      label: "Spezies auswählen",
      content: (
        <AnimalSpeziesChooseStep
          speciesId={speciesId}
          onSpeciesChange={handleSpeciesIdChange}
        />
      ),
    },
    {
      label: "Rasse auswählen",
      content: (
        <AnimalRaceChooseStep
          raceId={raceId}
          speciesId={speciesId}
          onRaceChange={handleRaceIdChange}
        />
      ),
    },
  ];

  useEffect(() => {
    reset();
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


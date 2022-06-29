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
import { SearchAnimalStep } from "./SearchAnimalStep";
import { SearchCustomerStep } from "./SearchCustomerStep";
import { SearchRaceChooseStep } from "./SearchRaceChooseStep";
import { SearchSpeciesChooseStep } from "./SearchSpeciesChooseStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchAnimalModal = ({ isOpen, onClose }: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { showErrorToast } = useCustomToast();
  const { isLoading, error, get } = useFetch();

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
   * Handles the search of the animal(s)
   */
  const handleSearchAnimal = async () => {
    const parameters = {
      name: animalName,
      birthdate: animalBirthdate,
      weight: animalWeight,
      customerId: customerId,
      raceId: raceId,
      speciesId: speciesId,
    };

    let empty_query = true;
    for (const k in parameters) {
      if (k != null || undefined)  {
        empty_query = false;
        break;
      }
    }
    let data = undefined;
    if (!empty_query && parameters.name === "") {
      data = await get("/api/animal/");
    }
    else {
      let query="";
      if (parameters.birthdate != null || undefined) {
        query += "birthdate=" + String(parameters.birthdate) +"&";
      }
      if (parameters.customerId != null || undefined) {
        query += "customerId=" + String(parameters.customerId) + "&";
      }
      if (parameters.name != null || undefined) {
        query += "name=" + String(parameters.name) + "&";
      }
      if (parameters.raceId != null || undefined) {
        query += "raceId=" + String(parameters.raceId) + "&";
      }
      if (parameters.weight != null || undefined) {
        query += "weight=" + String(parameters.weight) + "&";
      }
      if (parameters.speciesId != null || undefined) {
        query += "speciesId=" + String(parameters.speciesId);
      }
      if (query.slice(-1)=="&") query = query.slice(0,-1);
      data = await get("api/animal/data/?"+query);
    }

    if (error || !data) {
      return showErrorToast(
        "Fehler",
        error || "Fehler beim Suchen des Tieres"
      );
    }

    showSuccessToast("Erfolgreich", "Tiere wurden erfolgreich gefunden");

    onClose();
  };

  const steps = [
    {
      label: "Tierdaten",
      content: (
        <SearchAnimalStep
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
      label: "Besitzerdaten",
      content: (
        <SearchCustomerStep
          customerId={customerId}
          onCustomerChange={handleCustomerIdChange}
        />
      ),
    },
    {
      label: "Speziesdaten",
      content: (
        <SearchSpeciesChooseStep
          speciesId={speciesId}
          onSpeciesChange={handleSpeciesIdChange}
        />
      ),
    },
    {
      label: "Rassedaten",
      content: (
        <SearchRaceChooseStep
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
                  ? handleSearchAnimal
                  : nextStep
              }
              isLoading={isLoading}
              disabled={activeStep >= steps.length}
              mr={activeStep == 3 ? 0 : 4}
            >
              {activeStep === steps.length - 1 ? "Tier suchen" : "Weiter"}
            </Button>
            <Button
              onClick={
                handleSearchAnimal
              }
              isLoading={isLoading}
              hidden={activeStep == 3}>Tier suchen
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
function showSuccessToast(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
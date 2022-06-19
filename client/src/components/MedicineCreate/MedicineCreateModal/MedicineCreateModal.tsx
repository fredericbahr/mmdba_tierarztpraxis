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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicineCreateModal = ({ isOpen, onClose }: IProps) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { showErrorToast } = useCustomToast();
  const { isLoading, error, post } = useFetch();

  /**
   * Handles the creation of the animal
   */
  const handleMedicineCreation = async () => {};

  const steps: IStep[] = [];

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
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { CustomerCreateForm } from "../CustomerCreateForm/CustomerCreateForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerCreateModal = ({ isOpen, onClose }: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [customerName, setCustomerName] = useState("");
  const [customerStreet, setCustomerStreet] = useState("");
  const [customerZip, setCustomerZip] = useState<number | undefined>(undefined);
  const [customerCity, setCustomerCity] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const handleCustomerNameChange = (value: string) => {
    setCustomerName(value);
  };

  const handleCustomerStreetChange = (value: string) => {
    setCustomerStreet(value);
  };

  const handleCustomerZipChange = (value: number) => {
    setCustomerZip(value);
  };

  const handleCustomerCityChange = (value: string) => {
    setCustomerCity(value);
  };

  const handleCustomerPhoneNumberChange = (value: string) => {
    setCustomerPhoneNumber(value);
  };

  const handleOwnerCreation = async () => {
    const body = {
      name: customerName,
      street: customerStreet,
      plz: customerZip,
      city: customerCity,
      phoneNumber: customerPhoneNumber,
    };

    await post("/api/customer", body);

    if (error) {
      showErrorToast("Fehler", error || "Fehler beim Anlegen eines Besitzers");
    }

    showSuccessToast("Erfolg", "Besitzer erfolgreich angelegt");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Besitzer anlegen</ModalHeader>
        <ModalBody>
          <CustomerCreateForm
            onNameChange={handleCustomerNameChange}
            onStreetChange={handleCustomerStreetChange}
            onZipChange={handleCustomerZipChange}
            onCityChange={handleCustomerCityChange}
            onPhoneNumberChange={handleCustomerPhoneNumberChange}
          />
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button onClick={onClose} mr={4} variant="ghost">
              Abbrechen
            </Button>
            <Button isLoading={isLoading} onClick={handleOwnerCreation}>
              Besitzer anlegen
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

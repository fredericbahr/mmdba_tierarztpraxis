import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ICustomer } from "../../../interfaces/customerInterface";
import { CustomerCreateForm } from "../CustomerCreateForm/CustomerCreateForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setNewCustomer: (customer: ICustomer) => void;
}

export const CustomerCreateModal = ({
  isOpen,
  onClose,
  setNewCustomer,
}: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [customerName, setCustomerName] = useState("");
  const [customerStreet, setCustomerStreet] = useState("");
  const [customerZip, setCustomerZip] = useState<number | undefined>(undefined);
  const [customerCity, setCustomerCity] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const handleCustomerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerName(event.target.value);
  };

  const handleCustomerStreetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerStreet(event.target.value);
  };

  const handleCustomerZipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerZip(Number(event.target.value));
  };

  const handleCustomerCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerCity(event.target.value);
  };

  const handleCustomerPhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerPhoneNumber(event.target.value);
  };

  const handleOwnerCreation = async () => {
    const body = {
      name: customerName,
      street: customerStreet,
      plz: customerZip,
      city: customerCity,
      phoneNumber: customerPhoneNumber,
    };

    const { customer } = await post("/api/customer", body);

    if (!customer || error) {
      return showErrorToast(
        "Fehler",
        error || "Fehler beim Anlegen eines Besitzers"
      );
    }

    showSuccessToast("Erfolg", "Besitzer erfolgreich angelegt");
    setNewCustomer(customer);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Besitzer anlegen</ModalHeader>
        <ModalCloseButton />
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

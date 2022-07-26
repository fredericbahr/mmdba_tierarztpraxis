import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ICustomer } from "../../interfaces/customerInterface";
import { SearchCustomerStep } from "../SearchCustomer/SearchCustomerStep";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setResults: (results: any) => void;
}

export const SearchCustomerModal = ({
  isOpen,
  onClose,
  setResults,
}: IProps) => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { isLoading, error, get } = useFetch();

  const [customerName, setCustomerName] = useState("");
  const [customerCreatedAt, setCustomerCreatedAt] = useState<Date | null>(null);
  const [customerCity, setCustomerCity] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerPlz, setCustomerPlz] = useState<number | null>(null);
  const [customerStreet, setCustomerStreet] = useState("");

  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    setResults(customers);
  }, [customers]);

  const handleCustomerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerName(event.target.value);
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

  const handleCustomerStreetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerStreet(event.target.value);
  };

  const handleCustomerCreatedAtChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerCreatedAt(new Date(event.target.value));
  };

  const handleCustomerPlzChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerPlz(Number(event.target.value));
  };

  /**
   * Handles the search of the animal(s)
   */
  const handleSearchCustomer = async () => {
    const parameters = {
      name: customerName,
      createdAt: customerCreatedAt,
      city: customerCity,
      phoneNumber: customerPhoneNumber,
      plz: customerPlz,
      street: customerStreet,
    };
    const empty_query =
      Object.keys(parameters).length === 1 && parameters.name.length === 0
        ? false
        : true;

    if (!empty_query) {
      const data = await get("/api/customer/");
      console.log(data);
      setCustomers(data.customer);
    } else {
      let query = "";
      if (parameters.createdAt != null || undefined) {
        query += "createdAt=" + String(parameters.createdAt) + "&";
      }
      if (parameters.city != null || undefined) {
        query += "city=" + String(parameters.city) + "&";
      }
      if (parameters.name != null || undefined) {
        query += "name=" + String(parameters.name) + "&";
      }
      if (parameters.phoneNumber != null || undefined) {
        query += "phoneNumber=" + String(parameters.phoneNumber) + "&";
      }
      if (parameters.plz != null || undefined) {
        query += "plz=" + String(parameters.plz) + "&";
      }
      if (parameters.street != null || undefined) {
        query += "street=" + String(parameters.street);
      }
      if (query.slice(-1) == "&") query = query.slice(0, -1);
      const data = await get("api/customer/data/?" + query);
      setCustomers(data.customer);
    }

    if (error || !customers) {
      return showErrorToast("Fehler", error || "Fehler beim Suchen des Kunden");
    }

    showSuccessToast("Erfolgreich", "Kunden wurden erfolgreich gefunden");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex flexDir="column" marginTop={4}>
            <SearchCustomerStep
              customerName={customerName}
              onCustomerNameChange={handleCustomerNameChange}
              customerCreatedAt={customerCreatedAt}
              onCustomerCreatedAtChange={handleCustomerCreatedAtChange}
              customerCity={customerCity}
              onCustomerCityChange={handleCustomerCityChange}
              customerPhoneNumber={customerPhoneNumber}
              onCustomerPhoneNumberChange={handleCustomerPhoneNumberChange}
              customerPlz={customerPlz}
              onCustomerPlzChange={handleCustomerPlzChange}
              customerStreet={customerStreet}
              onCustomerStreetChange={handleCustomerStreetChange}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            <Button mr={4} onClick={onClose} variant="ghost">
              Abbrechen
            </Button>
            <Button onClick={handleSearchCustomer} isLoading={isLoading}>
              Kunden suchen
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

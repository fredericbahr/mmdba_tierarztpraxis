import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { TrashSimple } from "phosphor-react";
import React from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ICustomer } from "../../interfaces/customerInterface";
import { DeleteAlert } from "../DeleteAlert/DeleteAlert";

interface IProps {
  customer: ICustomer;
  allCustomers: ICustomer[];
  setResults: (results: any) => void;
}

export const CustomerCard = ({
  customer,
  allCustomers,
  setResults,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showErrorToast } = useCustomToast();

  const { isLoading, error, deleteFetch } = useFetch();

  const handleDeleteRequest = async () => {
    onClose();
    const result = await deleteFetch(`/api/customer/delete/${customer.id}`);
    console.log(result);

    if (!result || error) {
      return showErrorToast("Fehler", "Fehler beim Löschen des Kunden");
    }

    const newCustomer = allCustomers.filter(
      (customer) => customer.id != result.deleteCustomer.id
    );
    setResults(newCustomer);
  };

  return (
    <>
      <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
        <VStack spacing={4} alignItems="left" justify="center">
          <HStack alignItems="left">
            <Heading as="h4" size="md" width="full">
              {customer.name}
            </Heading>
            <Tooltip hasArrow label="Kunde löschen">
              <IconButton
                icon={<Icon as={TrashSimple} />}
                aria-label="Löschen"
                colorScheme="red"
                variant="ghost"
                isLoading={isLoading}
                onClick={onOpen}
              />
            </Tooltip>
            <DeleteAlert
              heading="Kunde löschen?"
              body="Wollen Sie den Kunden wirklich löschen?"
              isOpen={isOpen}
              isLoading={isLoading}
              onClose={onClose}
              onDelete={handleDeleteRequest}
            />
          </HStack>
          <HStack
            w="full"
            justifyContent="start"
            alignItems="start"
            spacing={8}
          >
            <VStack alignItems="start">
              <Text>Erster Besuch</Text>
              <Text fontSize="xs">
                {format(new Date(customer.createdAt), "dd.MM.yyyy")}
              </Text>
            </VStack>
            <VStack>
              <Text>Stadt: {customer.city}</Text>
            </VStack>
            <VStack alignItems="start">
              <Text>Straße: {customer.street}</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { TrashSimple, X } from "phosphor-react";
import React, { useState } from "react";

import { useFetch } from "../../hooks/useFetch";
import { ICustomer } from "../../interfaces/customerInterface";

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

  const [showMore, setShowMore] = useState(false);
  const { isLoading, error, deleteFetch } = useFetch();

  const handleDeleteRequest = async () => {
    const result = await deleteFetch("/api/customer/delete/" + customer.id);
    console.log(result);
    const newCustomer = allCustomers.filter(
      (customer) => customer.id != result.deleteCustomer.id
    );
    setResults(newCustomer);
    onClose();
  };

  return (
    <>
      <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
        <VStack spacing={4} alignItems="left" justify="center">
          <HStack alignItems="left">
            <Heading as="h4" size="md" width="full">
              {customer.name}
            </Heading>
            <IconButton
              icon={<Icon as={TrashSimple} />}
              aria-label="Löschen"
              colorScheme="red"
              variant="ghost"
              isLoading={isLoading}
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <Heading as="h4" size="md" p={5}>
                    Wollen Sie den Kunden wirklich löschen?
                  </Heading>
                  <HStack
                    alignItems="center"
                    spacing={4}
                    width="full"
                    justify="center"
                  >
                    <IconButton
                      icon={<Icon as={X} />}
                      aria-label="Schließen"
                      colorScheme="blue"
                      isLoading={isLoading}
                      onClick={onClose}
                    />
                    <Button onClick={handleDeleteRequest}>Bestätigen</Button>
                  </HStack>
                </ModalBody>
              </ModalContent>
            </Modal>
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

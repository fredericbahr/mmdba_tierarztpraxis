import {
    Box,
    Heading,
    HStack,
    Text,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import format from "date-fns/format";
  import { CaretDown, CaretUp } from "phosphor-react";
  import React, { useState } from "react";

  import { ICustomer } from "../../interfaces/customerInterface";
  
  interface IProps {
    customer: ICustomer;
  }
  
  export const CustomerCard = ({ customer }: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [showMore, setShowMore] = useState(false);
  
    return (
      <>
        <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
          <VStack spacing={4} alignItems="center">
            <Heading as="h4" size="md" width="full">
              {customer.name}
            </Heading>
            <HStack
              w="full"
              justifyContent="start"
              alignItems="start"
              spacing={8}
            >
              <VStack>
                <Text>Erster Besuch</Text>
                <Text fontSize="xs">{format(new Date(customer.createdAt), "dd.MM.yyyy")}</Text>
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
  
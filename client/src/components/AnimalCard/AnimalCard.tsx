import {
  Box,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CaretDown, CaretUp } from "phosphor-react";
import React, { useState } from "react";

import { IAnimals } from "../../interfaces/animalInterface";

interface IProps {
  animals: IAnimals;
}

export const AnimalCard = ({ animals }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
        <VStack spacing={4} alignItems="center">
          <Heading as="h4" size="md" width="full">
            {animals.name}
          </Heading>
          <HStack
            w="full"
            justifyContent="start"
            alignItems="start"
            spacing={8}
          >
            <VStack>
              <Text>Geburtstag</Text>
              <Text fontSize="xs">{String(animals.birthdate)}</Text>
            </VStack>
            <VStack alignItems="start">
              <Text>Beschreibung</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

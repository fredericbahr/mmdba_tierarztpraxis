import "./MedicineCard.css";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CaretDown, CaretUp, TrashSimple } from "phosphor-react";
import React, { useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IMedicine } from "../../interfaces/medicineInterface";
import { PDFFullScreenModal } from "../PDFFullScreenModal/PDFFullScreenModal";

interface IProps {
  medicine: IMedicine;
  deleteMedicine?: (id: number) => void;
}

export const MedicineCard = ({
  medicine,
  deleteMedicine = undefined,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, error, deleteFetch } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [showMore, setShowMore] = useState(false);

  const handleDelete = async (id: number) => {
    const { deletedMedicine } = await deleteFetch(`/api/medicine/${id}`);

    if (!deletedMedicine || error) {
      return showErrorToast("Fehler", "Fehler beim Löschen des Medikaments");
    }

    if (deleteMedicine) {
      deleteMedicine(id);
    }
  };

  return (
    <>
      <Box boxShadow="md" rounded="md" px={4} py={8} w="full" h="full">
        <VStack spacing={4} alignItems="center">
          <HStack w="full" justifyContent="space-around">
            <Heading as="h4" size="md" width="full">
              {medicine.name}
            </Heading>
            {deleteMedicine && (
              <IconButton
                icon={<Icon as={TrashSimple} />}
                aria-label="Löschen"
                colorScheme="red"
                variant="ghost"
                isLoading={isLoading}
                onClick={() => handleDelete(medicine.id)}
              />
            )}
          </HStack>
          <HStack
            w="full"
            justifyContent="start"
            alignItems="start"
            spacing={8}
          >
            <VStack>
              <Text>Dosis</Text>
              <Text fontSize="xs">{medicine.dosis}</Text>
            </VStack>
            <VStack alignItems="start">
              <Text>Beschreibung</Text>
              {!medicine.description && <Text>---</Text>}
              {medicine.description && (
                <Box>
                  {!showMore && (
                    <>
                      <Text
                        fontSize="xs"
                        maxHeight={!showMore ? "4.8rem" : "auto"}
                        overflow="hidden"
                      >
                        {medicine.description.substring(0, 150)}{" "}
                        {medicine.description.length > 150 ? "..." : ""}
                      </Text>
                      {medicine.description.length > 150 && (
                        <Tooltip title="Mehr anzeigen">
                          <IconButton
                            aria-label="Show more"
                            icon={<Icon as={CaretDown} />}
                            variant="ghost"
                            size="xs"
                            onClick={() => setShowMore(true)}
                          />
                        </Tooltip>
                      )}
                    </>
                  )}
                  {showMore && (
                    <>
                      <Text fontSize="xs">{medicine.description}</Text>
                      <IconButton
                        aria-label="Show less"
                        icon={<Icon as={CaretUp} />}
                        variant="ghost"
                        size="xs"
                        onClick={() => setShowMore(false)}
                      />
                    </>
                  )}
                </Box>
              )}
            </VStack>
          </HStack>
          {medicine.blob && (
            <Flex alignItems="start" w="full">
              <Button
                variant="link"
                onClick={onOpen}
                colorScheme="blue"
                marginTop={8}
              >
                Dokumentation
              </Button>
            </Flex>
          )}
        </VStack>
      </Box>
      {medicine.blob && (
        <PDFFullScreenModal
          isOpen={isOpen}
          onClose={onClose}
          pdf={medicine.blob}
        />
      )}
    </>
  );
};

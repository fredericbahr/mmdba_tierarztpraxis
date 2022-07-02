import "./MedicineCard.css";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Document, Page } from "react-pdf";

import { useCustomToast } from "../../hooks/useCustomToast";
import { IMedicine } from "../../interfaces/medicineInterface";

interface IProps {
  medicine: IMedicine;
}

export const MedicineCard = ({ medicine }: IProps) => {
  const { showErrorToast } = useCustomToast();

  return (
    <Box boxShadow="md" rounded="md" px={4} py={8}>
      <VStack spacing={4} alignItems="start">
        <Heading as="h4" size="md">
          {medicine.name}
        </Heading>
        <HStack
          w="full"
          justifyContent="space-around"
          alignItems="start"
          spacing={8}
        >
          <VStack>
            <Text>Dosis</Text>
            <Text>{medicine.dosis}</Text>
          </VStack>
          <VStack alignItems="start">
            <Text>Beschreibung</Text>
            <Box maxHeight={"4.8rem"} overflow="hidden">
              <Text>
                {medicine.description.substring(0, 150)}{" "}
                {medicine.description.length > 150 ? "..." : ""}
              </Text>
            </Box>
          </VStack>
        </HStack>
        {medicine.blob && (
          <Box w="xs">
            <Document
              file={medicine.blob}
              onLoadError={(e: Error) => {
                console.log(e);
                showErrorToast("Fehler", "Fehler beim Laden einer PDF Datei");
              }}
              onItemClick={() => alert("clicked")}
            >
              <Page pageNumber={1} />
            </Document>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

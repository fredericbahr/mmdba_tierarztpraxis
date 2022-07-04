import { Flex, Grid, GridItem, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { MedicineCard } from "../../components/MedicineCard/MedicineCard";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IMedicine } from "../../interfaces/medicineInterface";

export const MedicineOverview = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [medicine, setMedicine] = useState<IMedicine[]>([]);

  useEffect(() => {
    const fetchLatestMedicine = async () => {
      const { medicines } = await get("/api/medicines/latest");

      if (!medicines || error) {
        return showErrorToast(
          "Fehler",
          "Fehler beim Laden der letzen Medikamente"
        );
      }

      setMedicine(medicines);
    };
    fetchLatestMedicine();
  }, []);

  return (
    <>
      <Heading as="h3" size="lg">
        Neusten Medikamente
      </Heading>
      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
          {medicine.map((medicine, index) => (
            <GridItem key={index}>
              <MedicineCard medicine={medicine} />
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};

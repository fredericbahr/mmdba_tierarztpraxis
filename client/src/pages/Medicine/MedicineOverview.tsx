import { Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
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
      <Heading as="h3" size="xl">
        Neusten Medikamente
      </Heading>
      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          {medicine.map((medicine, index) => (
            <MedicineCard medicine={medicine} key={index} />
          ))}
        </Grid>
      )}
    </>
  );
};

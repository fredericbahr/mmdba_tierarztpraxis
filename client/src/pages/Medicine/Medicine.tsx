import { Box, Button, Grid, GridItem, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { MedicineSearch } from "../../components/MedicineSearch/MedicineSearch";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IMedicine } from "../../interfaces/medicineInterface";
import { MedicineCreate } from "./MedicineCreate";
import { MedicineOverview } from "./MedicineOverview";

export const Medicine = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [searchResults, setSearchResults] = useState<IMedicine[]>([]);

  useEffect(() => {
    const fetchLatestMedicine = async () => {
      const { medicines } = await get("/api/medicines/latest/6");

      if (!medicines || error) {
        return showErrorToast(
          "Fehler",
          "Fehler beim Laden der letzen Medikamente"
        );
      }

      setMedicines(medicines);
    };
    fetchLatestMedicine();
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
      <GridItem colSpan={2}>
        {searchResults.length > 0 && (
          <VStack spacing={8}>
            <MedicineOverview
              isLoading={false}
              medicines={searchResults}
              heading="Suchergebnisse"
            />
            <Button variant="ghost" onClick={() => setSearchResults([])}>
              Suche zurücksetzen
            </Button>
          </VStack>
        )}
        {searchResults.length === 0 && (
          <MedicineOverview
            isLoading={isLoading}
            medicines={medicines}
            heading="Neusten Medikamente"
          />
        )}
      </GridItem>
      <GridItem>
        <Box marginBottom={4}>
          <MedicineSearch setResults={setSearchResults} />
        </Box>
        <MedicineCreate />
      </GridItem>
    </Grid>
  );
};

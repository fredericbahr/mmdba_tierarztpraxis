import { Box, Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import MedicineSearch from "../../components/MedicineSearch/MedicineSearch";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IMedicine } from "../../interfaces/medicineInterface";
import { MedicineCreate } from "./MedicineCreate";
import { MedicineOverview } from "./MedicineOverview";

export const Medicine = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const searchRef = useRef<any>();

  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [searchResults, setSearchResults] = useState<IMedicine[] | null>(null);

  const handleConnectKeywordsWithOrClick = () => {
    if (searchRef.current) {
      searchRef.current.handleConnectKeywordsWithOr();
    }
  };

  const handleSearchReset = () => {
    if (searchRef.current) {
      searchRef.current.resetSearch();
    }

    setSearchResults(null);
  };

  const handleMedicineDelete = (id: number) => {
    setMedicines(medicines.filter((medicine: IMedicine) => medicine.id !== id));
  };

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
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
      gridGap={8}
    >
      <GridItem colSpan={[1, 2]}>
        {searchResults?.length === 0 && (
          <VStack spacing={4} marginTop={12}>
            <Text>Es wurden keine Ergebnisse gefunden.</Text>
            <Text>Wollen Sie die erweiterte Suchanfrage verodern?</Text>
            <Button
              onClick={() => handleConnectKeywordsWithOrClick()}
              variant="ghost"
            >
              Suchanfrage verodern
            </Button>
            <Button onClick={() => handleSearchReset()} variant="ghost">
              Suchanfrage zurücksetzen
            </Button>
          </VStack>
        )}
        {searchResults && searchResults.length > 0 && (
          <VStack spacing={8}>
            <MedicineOverview
              isLoading={false}
              medicines={searchResults}
              heading="Suchergebnisse"
              deleteMedicine={handleMedicineDelete}
            />
            <Button variant="ghost" onClick={() => handleSearchReset()}>
              Suche zurücksetzen
            </Button>
          </VStack>
        )}
        {!searchResults && (
          <MedicineOverview
            isLoading={isLoading}
            medicines={medicines}
            heading="Neusten Medikamente"
            deleteMedicine={handleMedicineDelete}
          />
        )}
      </GridItem>
      <GridItem>
        <Box marginBottom={4}>
          <MedicineSearch ref={searchRef} setResults={setSearchResults} />
        </Box>
        <MedicineCreate />
      </GridItem>
    </Grid>
  );
};

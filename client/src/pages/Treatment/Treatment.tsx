import {
  Button,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { TreatmentCreate } from "./TreatmentCreate";
import { TreatmentOverview } from "./TreatmentOverview";
import { TreatmentSearch } from "./TreatmentSearch";

export const Treatment = () => {
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [searchResults, setSearchResults] = useState<ITreatment[] | null>(null);

  const { isLoading, error, get } = useFetch();

  const { showErrorToast } = useCustomToast();

  const addTreatment = (treatment: ITreatment) => {
    setTreatments([...treatments, treatment]);
  };

  const deleteTreatment = (id: number) => {
    setTreatments(treatments.filter((treatment) => treatment.id !== id));
  };

  const handleSearchResults = (searchResults: ITreatment[] | null) => {
    setSearchResults(searchResults);
  };

  const handleSearchReset = () => {
    setSearchResults(null);
  };

  useEffect(() => {
    const fetchLatestTreatment = async () => {
      const { treatments } = await get("/api/treatments/latest/10");

      if (!treatments || error) {
        return showErrorToast(
          "Fehler",
          "Fehler beim Laden der letzen Behandlungen"
        );
      }

      setTreatments(treatments);
    };
    fetchLatestTreatment();
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
      <GridItem colSpan={2}>
        <Heading>Behandlungen</Heading>
        {searchResults?.length === 0 && (
          <VStack spacing={4} marginTop={12}>
            <Text>Es wurden keine Ergebnisse gefunden.</Text>
            <Text>Wollen Sie die erweiterte Suchanfrage verodern?</Text>
            <Button onClick={() => alert("verodern")} variant="ghost">
              Suchanfrage verodern
            </Button>
            <Button onClick={() => handleSearchReset()} variant="ghost">
              Suchanfrage zurücksetzen
            </Button>
          </VStack>
        )}
        {searchResults && searchResults?.length > 0 && (
          <Stack>
            <TreatmentOverview
              treatments={searchResults}
              isLoading={isLoading}
              deleteTreatment={deleteTreatment}
            />

            <Button variant="ghost" onClick={() => setSearchResults(null)}>
              Suche zurücksetzen
            </Button>
          </Stack>
        )}
        {!searchResults && (
          <TreatmentOverview
            treatments={treatments}
            isLoading={isLoading}
            deleteTreatment={deleteTreatment}
          />
        )}
      </GridItem>
      <GridItem>
        <VStack spacing={8} alignItems="start">
          <TreatmentSearch setSearchResults={handleSearchResults} />
          <TreatmentCreate addTreatment={addTreatment} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { TreatmentCreate } from "./TreatmentCreate";
import { TreatmentOverview } from "./TreatmentOverview";
import TreatmentSearch from "./TreatmentSearch";

export const Treatment = () => {
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [searchResults, setSearchResults] = useState<ITreatment[] | null>(null);

  const { isLoading, error, get } = useFetch();

  const { showErrorToast } = useCustomToast();
  const searchRef = useRef<any>();

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
    if (searchRef.current) {
      searchRef.current.resetSearch();
    }

    setSearchResults(null);
  };

  const handleQueryConnectorToOr = () => {
    if (searchRef.current) {
      searchRef.current.handleQueryConnectorToOr();
      searchRef.current.onOpen();
    }
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
            <Button onClick={() => handleQueryConnectorToOr()} variant="ghost">
              Suchanfrage verodern
            </Button>
            <Button onClick={() => handleSearchReset()} variant="ghost">
              Suchanfrage zurücksetzen
            </Button>
          </VStack>
        )}
        {searchResults && searchResults?.length > 0 && (
          <Stack spacing={4}>
            <TreatmentOverview
              treatments={searchResults}
              isLoading={isLoading}
              deleteTreatment={deleteTreatment}
            />

            <Flex justifyContent="center">
              <Button variant="ghost" onClick={() => handleSearchReset()}>
                Suche zurücksetzen
              </Button>
            </Flex>
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
          <TreatmentSearch
            ref={searchRef}
            setSearchResults={handleSearchResults}
          />
          <TreatmentCreate addTreatment={addTreatment} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

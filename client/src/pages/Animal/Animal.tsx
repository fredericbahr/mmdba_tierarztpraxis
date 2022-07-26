import { Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IAnimals } from "../../interfaces/animalInterface";
import { AnimalCreate } from "./AnimalCreate";
import { AnimalOverview } from "./AnimalOverview";
import { SearchAnimals } from "./SearchAnimals";

export const Animal = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [searchResults, setSearchResults] = useState<IAnimals[] | null>(null);

  useEffect(() => {
    const fetchLatestAnimals = async () => {
      const { animals } = await get("/api/animals/latest/6");

      if (!animals || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der letzen Tiere");
      }

      setAnimals(animals);
    };
    fetchLatestAnimals();
  }, []);

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", "2xl": "repeat(3, 1fr)" }}
      gridGap={8}
    >
      <GridItem colSpan={2}>
        {searchResults && searchResults.length > 0 && (
          <VStack spacing={8}>
            <AnimalOverview
              isLoading={false}
              animals={searchResults}
              heading="Suchergebnisse"
              setResults={setSearchResults}
            />
            <Button variant="ghost" onClick={() => setSearchResults(null)}>
              Suche zurücksetzen
            </Button>
          </VStack>
        )}
        {!searchResults && (
          <AnimalOverview
            isLoading={isLoading}
            animals={animals}
            heading="Neusten Tiere"
            setResults={setAnimals}
          />
        )}
      </GridItem>
      <GridItem>
        <VStack spacing={8} alignItems="start">
          <SearchAnimals setResults={setSearchResults} />
          <AnimalCreate />
        </VStack>
      </GridItem>
    </Grid>
  );
};

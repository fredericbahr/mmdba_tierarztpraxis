import { Button, Grid, GridItem, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { SearchAnimalModal } from "../../components/SearchAnimal/SearchAnimalModal";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IAnimals } from "../../interfaces/animalInterface";
import { AnimalCreate } from "./AnimalCreate";
import { AnimalOverview } from "./AnimalOverview";
import { SearchAnimals } from "./SearchAnimals";

export const Animal = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [searchResults, setSearchResults] = useState<IAnimals[]>([]);

  useEffect(() => {
    console.log(searchResults, "- Search results have changed");
  }, [searchResults]);

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", "2xl": "repeat(3, 1fr)" }}
      gridGap={8}
    >
      <GridItem colSpan={2}>
        {searchResults.length > 0 && (
          <VStack spacing={8}>
            <AnimalOverview
              isLoading={false}
              animals={searchResults}
              heading="Suchergebnisse"
              setResults={setSearchResults}
            />
            <Button variant="ghost" onClick={() => setSearchResults([])}>
              Suche zurücksetzen
            </Button>
          </VStack>
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

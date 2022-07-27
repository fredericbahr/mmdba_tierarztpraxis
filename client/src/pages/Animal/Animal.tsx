import { Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IAnimal } from "../../interfaces/animalInterface";
import { AnimalCreate } from "./AnimalCreate";
import { AnimalOverview } from "./AnimalOverview";
import { SearchAnimals } from "./SearchAnimals";

export const Animal = () => {
  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [searchResults, setSearchResults] = useState<IAnimal[] | null>(null);

  const handleNewAnimal = (animal: IAnimal) => {
    setAnimals([...animals, animal]);
  };

  useEffect(() => {
    const fetchLatestAnimals = async () => {
      const { animals } = await get("/api/animals/latest/6");

      if (!animals || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der letzen Tiere");
      }

      console.log(animals);

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
        {searchResults && searchResults.length === 0 && (
          <VStack spacing={4} marginTop={12}>
          <Text>Es wurden keine Ergebnisse gefunden.</Text>
          <Button onClick={() => setSearchResults(null)} variant="ghost">
            Suchanfrage zurücksetzen
          </Button>
        </VStack>
        )}
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
          <AnimalCreate setNewAnimal={handleNewAnimal} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

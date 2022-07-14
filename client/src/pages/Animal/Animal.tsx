import { Heading } from "@chakra-ui/react";
import { Box, Button, Grid, GridItem, Text,VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { SearchAnimalModal } from "../../components/SearchAnimal/SearchAnimalModal";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IAnimals } from "../../interfaces/animalInterface";
import { AnimalCreate } from "./AnimalCreate";
import { AnimalOverview } from "./AnimalOverview";

export const Animal = () => {

  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [searchResults, setSearchResults] = useState<IAnimals[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(searchResults, "- Search results have changed");
  },[searchResults]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
    <GridItem colSpan={2}>
      {searchResults.length > 0 && (
        <VStack spacing={8}>
          <AnimalOverview
                  isLoading={false}
                  animals={searchResults}
                  heading="Suchergebnisse"
          />
          <Button variant="ghost" onClick={() => setSearchResults([])}>
                  Suche zurücksetzen
          </Button>
        </VStack>
      )} 
    </GridItem>
    <GridItem>
      <Box marginBottom={4}>
        <Button onClick={onOpen}>Tiere suchen</Button>
        <SearchAnimalModal isOpen={isOpen} onClose={onClose} setResults={setSearchResults}/>
      </Box>
      <AnimalCreate />
    </GridItem>
    </Grid>
  );
};

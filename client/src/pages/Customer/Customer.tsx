import { Heading } from "@chakra-ui/react";
import { Box, Button, Grid, GridItem, Text,VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { SearchCustomerModal } from "../../components/SearchCustomer/SearchCustomerModal";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ICustomer } from "../../interfaces/customerInterface";
import { CustomerCreate } from "./CustomerCreate";
import { CustomerOverview } from "./CustomerOverview";

export const Customer = () => {

  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [searchResults, setSearchResults] = useState<ICustomer[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(searchResults, "- Search results have changed");
  },[searchResults]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
    <GridItem colSpan={2}>
      {searchResults.length > 0 && (
        <VStack spacing={8}>
          <CustomerOverview
                  isLoading={false}
                  customers={searchResults}
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
        <Button onClick={onOpen}>Kunde suchen</Button>
        <SearchCustomerModal isOpen={isOpen} onClose={onClose} setResults={setSearchResults}/>
      </Box>
      <CustomerCreate />
    </GridItem>
    </Grid>
  );
};


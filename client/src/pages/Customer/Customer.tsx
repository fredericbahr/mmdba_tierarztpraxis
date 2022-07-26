import { Box, Button, Grid, GridItem, VStack } from "@chakra-ui/react";
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

  const [searchResults, setSearchResults] = useState<ICustomer[] | null>(null);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSetResults = (results: ICustomer[]) => {
    setSearchResults(results);
    setCustomers(results);
  };

  useEffect(() => {
    const fetchLatestCustomers = async () => {
      const { customers } = await get("/api/customers/latest/6");

      if (!customers || error) {
        return showErrorToast("Fehler", "Fehler beim Laden der letzen Kunden");
      }

      setCustomers(customers);
    };
    fetchLatestCustomers();
  }, []);

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", "2xl": "repeat(3, 1fr)" }}
      gridGap={8}
    >
      <GridItem colSpan={2}>
        {searchResults && searchResults.length > 0 && (
          <VStack spacing={8}>
            <CustomerOverview
              isLoading={false}
              customers={searchResults}
              heading="Suchergebnisse"
              setResults={handleSetResults}
            />
            <Button variant="ghost" onClick={() => setSearchResults(null)}>
              Suche zurücksetzen
            </Button>
          </VStack>
        )}
        {!searchResults && (
          <CustomerOverview
            isLoading={isLoading}
            customers={customers}
            heading="Neusten Kunden"
            setResults={handleSetResults}
          />
        )}
      </GridItem>
      <GridItem>
        <Box marginBottom={4}>
          <Button onClick={onOpen}>Kunde suchen</Button>
          <SearchCustomerModal
            isOpen={isOpen}
            onClose={onClose}
            setResults={setSearchResults}
          />
        </Box>
        <CustomerCreate />
      </GridItem>
    </Grid>
  );
};

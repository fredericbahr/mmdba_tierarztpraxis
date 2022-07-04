import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const MedicineSearch = () => {
  const [medicineNameSearch, setMedicineNameSearch] = useState("");
  const [medicineKeywordsSearch, setMedicineKeywordsSearch] = useState<
    string[]
  >([]);

  const handleMedicineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineNameSearch(e.target.value);
  };

  const handleMedicineKeywordsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicineKeywordsSearch([...medicineKeywordsSearch, e.target.value]);
  };

  return (
    <>
      <Heading as="h3" size="lg">
        Medikamentensuche
      </Heading>
      <Box boxShadow="md" rounded="md" px={4} py={8}>
        <Stack spacing={4} alignItems="start" w="full">
          <form>
            <FormControl flex="1">
              <FormLabel htmlFor="nameSearch">Name des Medikaments</FormLabel>
              <Input
                id="nameSearch"
                type="text"
                placeholder="Medikamentname..."
              />
            </FormControl>
          </form>

          <Accordion allowToggle marginTop={8} size="xs">
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                <AccordionIcon />
                <Text flex="1">Erweiterte Suche</Text>
              </AccordionButton>

              <AccordionPanel>
                <Text>TEst</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button>Suchen</Button>
        </Stack>
      </Box>
    </>
  );
};

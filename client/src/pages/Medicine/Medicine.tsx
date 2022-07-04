import { Box, Grid, GridItem, Stack, VStack } from "@chakra-ui/react";
import React from "react";

import { MedicineSearch } from "../../components/MedicineSearch/MedicineSearch";
import { MedicineCreate } from "./MedicineCreate";
import { MedicineOverview } from "./MedicineOverview";

export const Medicine = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
      <GridItem colSpan={2}>
        <MedicineOverview />
      </GridItem>
      <GridItem>
        <Box marginBottom={4}>
          <MedicineSearch />
        </Box>
        <MedicineCreate />
      </GridItem>
    </Grid>
  );
};

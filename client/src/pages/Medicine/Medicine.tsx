import { Box, Stack } from "@chakra-ui/react";
import React from "react";

import { MedicineCreate } from "./MedicineCreate";
import { MedicineOverview } from "./MedicineOverview";

export const Medicine = () => {
  return (
    <Stack spacing={8} mx={4} w="full">
      <MedicineOverview />
      <Box>
        <MedicineCreate />
      </Box>
    </Stack>
  );
};

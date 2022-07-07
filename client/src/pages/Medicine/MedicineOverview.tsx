import { Flex, Grid, GridItem, Heading, Spinner } from "@chakra-ui/react";
import React from "react";

import { MedicineCard } from "../../components/MedicineCard/MedicineCard";
import { IMedicine } from "../../interfaces/medicineInterface";

interface IProps {
  isLoading: boolean;
  medicines: IMedicine[];
  heading?: string;
}

export const MedicineOverview = ({ isLoading, medicines, heading }: IProps) => {
  return (
    <>
      {heading && (
        <Heading as="h3" size="lg">
          {heading}
        </Heading>
      )}
      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
          {medicines.map((medicine: IMedicine, index: number) => (
            <GridItem key={index}>
              <MedicineCard medicine={medicine} />
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};

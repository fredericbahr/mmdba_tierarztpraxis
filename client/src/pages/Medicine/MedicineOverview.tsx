import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { MedicineCard } from "../../components/MedicineCard/MedicineCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { IMedicine } from "../../interfaces/medicineInterface";

interface IProps {
  isLoading: boolean;
  medicines: IMedicine[];
  heading?: string;
  showAmount?: number;
  deleteMedicine: (id: number) => void;
}

export const MedicineOverview = ({
  isLoading,
  medicines,
  heading,
  showAmount = 6,
  deleteMedicine,
}: IProps) => {
  const [page, setPage] = useState(1);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {heading && (
        <Heading as="h3" size="lg" textAlign="center">
          {heading}
        </Heading>
      )}
      {isLoading && (
        <Flex justifyContent="center" alignItems="center" mt={8}>
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <VStack spacing={6} mt={4}>
          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={6}
            w="full"
          >
            {medicines
              .slice(
                (page - 1) * showAmount,
                (page - 1) * showAmount + showAmount
              )
              .map((medicine: IMedicine, index: number) => (
                <GridItem key={index}>
                  <MedicineCard
                    medicine={medicine}
                    deleteMedicine={deleteMedicine}
                  />
                </GridItem>
              ))}
          </Grid>
          {medicines.length > 0 && (
            <Pagination
              count={Math.ceil(medicines.length / showAmount)}
              currentPage={page}
              handleClick={handlePagination}
            />
          )}
        </VStack>
      )}
    </>
  );
};

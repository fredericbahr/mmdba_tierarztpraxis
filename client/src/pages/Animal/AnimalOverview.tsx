import {
    Flex,
    Grid,
    GridItem,
    Heading,
    Spinner,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";

  import { AnimalCard } from "../../components/AnimalCard/AnimalCard";
  import { Pagination } from "../../components/Pagination/Pagination";
  import { IAnimals } from "../../interfaces/animalInterface";
  
  interface IProps {
    isLoading: boolean;
    animals: IAnimals[];
    heading?: string;
    showAmount?: number;
    setResults: (results: any) => void;
  }
  
  export const AnimalOverview = ({
    isLoading,
    animals,
    heading,
    showAmount = 6,
    setResults,
  }: IProps) => {
    const [page, setPage] = useState(1);
  
    const handlePagination = (page: number) => {
      setPage(page);
    };
  
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
          <VStack spacing={6}>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
              {animals
                .slice(
                  (page - 1) * showAmount,
                  (page - 1) * showAmount + showAmount
                )
                .map((animal: IAnimals, index: number) => (
                  <GridItem key={index}>
                    <AnimalCard animal={animal} allAnimals={animals} setResults={setResults}/>
                  </GridItem>
                ))}
            </Grid>
            <Pagination
              count={Math.ceil(animals.length / showAmount)}
              currentPage={page}
              handleClick={handlePagination}
            />
          </VStack>
        )}
      </>
    );
  };
  
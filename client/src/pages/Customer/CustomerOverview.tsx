import {
    Flex,
    Grid,
    GridItem,
    Heading,
    Spinner,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";

  import { CustomerCard } from "../../components/CustomerCard/CustomerCard";
  import { Pagination } from "../../components/Pagination/Pagination";
  import { ICustomer } from "../../interfaces/customerInterface";
  
  interface IProps {
    isLoading: boolean;
    customers: ICustomer[];
    heading?: string;
    showAmount?: number;
  }
  
  export const CustomerOverview = ({
    isLoading,
    customers,
    heading,
    showAmount = 6,
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
              {customers
                .slice(
                  (page - 1) * showAmount,
                  (page - 1) * showAmount + showAmount
                )
                .map((customer: ICustomer, index: number) => (
                  <GridItem key={index}>
                    <CustomerCard customer={customer} />
                  </GridItem>
                ))}
            </Grid>
            <Pagination
              count={Math.ceil(customers.length / showAmount)}
              currentPage={page}
              handleClick={handlePagination}
            />
          </VStack>
        )}
      </>
    );
  };
  
import { Heading } from "@chakra-ui/react";
import React from "react";

import { AnimalCreate } from "./AnimalCreate";
import { SearchAnimals } from "./SearchAnimals";

export const Animal = () => {
  return (
    <>
      <Heading>Tier suchen</Heading>
      <SearchAnimals />
      <Heading>Animal</Heading>
      <AnimalCreate />
    </>
  );
};

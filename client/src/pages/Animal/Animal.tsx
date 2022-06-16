import { Heading } from "@chakra-ui/react";
import React from "react";

import { AnimalCreate } from "./AnimalCreate";

export const Animal = () => {
  return (
    <>
      <Heading>Animal</Heading>
      <AnimalCreate />
    </>
  );
};

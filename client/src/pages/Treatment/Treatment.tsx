import { Heading } from "@chakra-ui/react";
import React from "react";

import { TreatmentCreate } from "./TreatmentCreate";

export const Treatment = () => {
  return (
    <>
      <Heading>Behandlungen</Heading>
      <TreatmentCreate></TreatmentCreate>
    </>
  );
};

import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { TreatmentCreate } from "./TreatmentCreate";
import { TreatmentOverview } from "./TreatmentOverview";
import { TreatmentSearch } from "./TreatmentSearch";

export const Treatment = () => {
  const [treatments, setTreatments] = React.useState<ITreatment[]>([]);

  const { isLoading, error, get } = useFetch();

  const { showErrorToast } = useCustomToast();

  const addTreatment = (treatment: ITreatment) => {
    setTreatments([...treatments, treatment]);
  };

  const deleteTreatment = (id: number) => {
    setTreatments(treatments.filter((treatment) => treatment.id !== id));
  };

  useEffect(() => {
    const fetchLatestTreatment = async () => {
      const { treatments } = await get("/api/treatments/latest/10");

      if (!treatments || error) {
        return showErrorToast(
          "Fehler",
          "Fehler beim Laden der letzen Behandlungen"
        );
      }

      setTreatments(treatments);
    };
    fetchLatestTreatment();
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={8}>
      <GridItem colSpan={2}>
        <Heading>Behandlungen</Heading>
        <TreatmentOverview
          treatments={treatments}
          isLoading={isLoading}
          deleteTreatment={deleteTreatment}
        />
      </GridItem>
      <GridItem>
        <VStack spacing={8} alignItems="start">
          <TreatmentSearch />
          <TreatmentCreate addTreatment={addTreatment} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { TreatmentCreate } from "./TreatmentCreate";
import { TreatmentOverview } from "./TreatmentOverview";

export const Treatment = () => {
  const [treatments, setTreatments] = React.useState<ITreatment[]>([]);

  const { isLoading, error, get } = useFetch();
  const { showErrorToast } = useCustomToast();

  useEffect(() => {
    const fetchLatestTreatment = async () => {
      const { treatments } = await get("/api/treatments/latest/10");

      console.log("Treatment.tsx: useEffect");
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
        <TreatmentOverview treatments={treatments} isLoading={isLoading} />
      </GridItem>
      <GridItem>
        <TreatmentCreate />
      </GridItem>
    </Grid>
  );
};

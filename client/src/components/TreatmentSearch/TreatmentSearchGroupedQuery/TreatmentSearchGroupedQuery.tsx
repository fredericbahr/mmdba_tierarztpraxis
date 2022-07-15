import { Box, VStack } from "@chakra-ui/react";
import React from "react";

import {
  ITreatmentSearchQuery,
  ITreatmentSingleQuery,
} from "../../../interfaces/treatmentSearchInterface";
import { TreatmentSearchSingleQuery } from "../TreatmentSearchSingleQuery/TreatmentSearchSingleQuery";

interface IProbs {
  groupedQuery: ITreatmentSearchQuery;
  onQueryChange: (changedQuery: ITreatmentSearchQuery) => void;
}

export const TreatmentSearchGroupedQuery = ({
  groupedQuery,
  onQueryChange,
}: IProbs) => {
  const handleQueryChange = (
    changeQuery: ITreatmentSingleQuery,
    idx: number
  ) => {
    const filteredGroupedQuery = groupedQuery.queries.filter(
      (_, i) => i !== idx
    );

    onQueryChange({
      ...groupedQuery,
      queries: [...filteredGroupedQuery, changeQuery],
    });
  };

  return (
    <VStack>
      {groupedQuery.queries.map((query, index) => (
        <Box backgroundColor="red.500" key={index}>
          <TreatmentSearchSingleQuery
            query={query}
            fieldOptions={[]}
            onQueryChange={(newQuery) => handleQueryChange(newQuery, index)}
          />
        </Box>
      ))}
    </VStack>
  );
};

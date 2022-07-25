import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ITreatment } from "../../../interfaces/treatmentInterface";
import {
  ITreatmentSearchQuery,
  ITreatmentSingleQuery,
} from "../../../interfaces/treatmentSearchInterface";
import { ITreatmentSearchRef } from "../../../pages/Treatment/Treatment";
import { TreatmentSearchGroupedQuery } from "./TreatmentSearchGroupedQuery/TreatmentSearchGroupedQuery";

interface IProps {
  onClose: () => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const TreatmentFilterSearch = (
  { onClose, setSearchResults, setIsLoading }: IProps,
  ref?: React.Ref<ITreatmentSearchRef>
) => {
  const { isLoading, error, post } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [searchQuery, setSearchQuery] = useState<ITreatmentSearchQuery[]>([
    {
      queries: [
        {
          field: undefined,
          condition: undefined,
          value: "",
        },
      ],
    },
  ]);

  const handleQueryChange = (
    changedQuery: ITreatmentSearchQuery,
    idx: number
  ) => {
    const mappedQuery = searchQuery.map((query, i) => {
      if (i === idx) {
        return changedQuery;
      }
      return query;
    });

    setSearchQuery(mappedQuery);
  };

  const handleQueryAdd = () => {
    setSearchQuery([
      ...searchQuery,
      {
        queries: [
          {
            field: undefined,
            condition: undefined,
            value: "",
          },
        ],
        connector: "AND",
      },
    ]);
  };

  const handleQueryRemove = (idx: number) => {
    const mappedQuery = searchQuery.filter((query, i) => i !== idx);
    setSearchQuery(mappedQuery);
  };

  const handleSearch = async () => {
    const { treatments: searchResults } = await post("/api/treatment/search", {
      searchQuery,
    });

    if (!searchResults && error) {
      setSearchResults(null);
      return showErrorToast("Fehler", "Fehler beim Suchen");
    }

    setSearchResults(searchResults);
    onClose();
  };

  const resetSearch = () => {
    setSearchQuery([
      {
        queries: [
          {
            field: undefined,
            condition: undefined,
            value: "",
          },
        ],
      },
    ]);
  };

  const handleSingleQueryConnectorToOr = (queries: ITreatmentSingleQuery[]) => {
    const mappedQueries: ITreatmentSingleQuery[] = queries.map((query) => {
      return {
        ...query,
        connector: "OR",
      };
    });

    return mappedQueries;
  };

  const handleQueryConnectorToOr = () => {
    const newSearchQuery: ITreatmentSearchQuery[] = searchQuery.map(
      (query: ITreatmentSearchQuery) => {
        return {
          queries: handleSingleQueryConnectorToOr(query.queries),
          connector: "OR",
        };
      }
    );

    setSearchQuery(newSearchQuery);
  };

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useImperativeHandle(ref, () => ({
    ...(ref as React.RefObject<ITreatmentSearchRef>).current,
    handleQueryConnectorToOr,
    resetSearch,
    handleSearch,
  }));

  return (
    <Stack spacing={4}>
      <Heading as="h3">Filter</Heading>
      {searchQuery.map((query, idx) => (
        <TreatmentSearchGroupedQuery
          key={idx}
          groupedQuery={query}
          showConnector={idx !== 0}
          onQueryChange={(newQuery) => handleQueryChange(newQuery, idx)}
          onQueryRemove={() => handleQueryRemove(idx)}
        />
      ))}
      <HStack>
        <Divider />
        <Box>
          <Button leftIcon={<Icon as={Plus} />} onClick={handleQueryAdd}>
            Hinzufügen
          </Button>
        </Box>
        <Divider />
      </HStack>
    </Stack>
  );
};

export default forwardRef(TreatmentFilterSearch);

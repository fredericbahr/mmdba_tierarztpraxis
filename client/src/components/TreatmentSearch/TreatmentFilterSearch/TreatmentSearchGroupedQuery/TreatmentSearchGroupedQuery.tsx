import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { CaretDown, Plus, TrashSimple } from "phosphor-react";
import React from "react";

import { ISelectOptions } from "../../../../interfaces/selectInterface";
import {
  ITreatmentSearchOuterConnector,
  ITreatmentSearchQuery,
  ITreatmentSingleQuery,
} from "../../../../interfaces/treatmentSearchInterface";
import { TreatmentSearchSingleQuery } from "../TreatmentSearchSingleQuery/TreatmentSearchSingleQuery";

interface IProbs {
  groupedQuery: ITreatmentSearchQuery;
  showConnector: boolean;
  onQueryChange: (changedQuery: ITreatmentSearchQuery) => void;
  onQueryRemove: () => void;
}

export const TreatmentSearchGroupedQuery = ({
  groupedQuery,
  showConnector,
  onQueryChange,
  onQueryRemove,
}: IProbs) => {
  const connectorOptions: ISelectOptions<ITreatmentSearchOuterConnector>[] = [
    { value: "AND", label: "und" },
    { value: "OR", label: "oder" },
  ];

  const handleSingleQueryChange = (
    changedQuery: ITreatmentSingleQuery,
    idx: number
  ) => {
    const mappedQueries = groupedQuery.queries.map((query, i) => {
      if (i === idx) {
        return changedQuery;
      }
      return query;
    });

    onQueryChange({ ...groupedQuery, queries: mappedQueries });
  };

  const handleSingleQueryAdd = () => {
    onQueryChange({
      ...groupedQuery,
      queries: [
        ...groupedQuery.queries,
        { field: undefined, condition: undefined, value: "", connector: "AND" },
      ],
    });
  };

  const handleSingleQueryRemove = (idx: number) => {
    const mappedQueries = groupedQuery.queries.filter((_, i) => i !== idx);
    onQueryChange({ ...groupedQuery, queries: mappedQueries });
  };

  const handleGroupedConnectorChange = (
    changedConnector: ITreatmentSearchOuterConnector
  ) => {
    onQueryChange({ ...groupedQuery, connector: changedConnector });
  };

  return (
    <Stack>
      {showConnector && (
        <HStack>
          <Divider />
          <Box flex={1}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Icon as={CaretDown} />}
                w="full"
                fontSize="sm"
              >
                {connectorOptions
                  .find((option) => option.value === groupedQuery.connector)
                  ?.label.toUpperCase()}
              </MenuButton>
              <MenuList>
                {connectorOptions.map((option, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => handleGroupedConnectorChange(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
          <Divider />
        </HStack>
      )}
      <HStack>
        <VStack
          backgroundColor="gray.100"
          w="full"
          borderRadius={2}
          padding={4}
          spacing={4}
        >
          {groupedQuery.queries.map((query, index) => (
            <Grid
              key={index}
              w="full"
              templateColumns="1fr auto"
              gap={4}
              flex={1}
            >
              <GridItem>
                <TreatmentSearchSingleQuery
                  query={query}
                  displayInnerConnector={index !== 0}
                  fieldOptions={[]}
                  onQueryChange={(newQuery) =>
                    handleSingleQueryChange(newQuery, index)
                  }
                />
              </GridItem>
              <GridItem alignSelf="center">
                {index !== 0 && (
                  <Tooltip label="Filter löschen" hasArrow>
                    <IconButton
                      icon={<Icon as={TrashSimple} />}
                      aria-label="Löschen"
                      onClick={() => handleSingleQueryRemove(index)}
                      colorScheme="red"
                      variant="ghost"
                    />
                  </Tooltip>
                )}
                {index === 0 && (
                  <Tooltip label="Filter löschen" hasArrow>
                    <IconButton
                      icon={<Icon as={TrashSimple} />}
                      aria-label="Löschen"
                      onClick={() => handleSingleQueryRemove(index)}
                      visibility="hidden"
                    />
                  </Tooltip>
                )}
              </GridItem>
            </Grid>
          ))}
          <Button
            leftIcon={<Icon as={Plus} />}
            onClick={handleSingleQueryAdd}
            aria-label="Add filter"
            variant="ghost"
          >
            Filter hinzufügen
          </Button>
        </VStack>
        <Tooltip label="Gruppierte Query löschen" hasArrow>
          <IconButton
            icon={<Icon as={TrashSimple} />}
            aria-label="Löschen"
            colorScheme="red"
            onClick={onQueryRemove}
          />
        </Tooltip>
      </HStack>
    </Stack>
  );
};

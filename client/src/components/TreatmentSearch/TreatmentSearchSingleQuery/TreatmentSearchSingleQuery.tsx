import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CaretDown } from "phosphor-react";
import React from "react";
import Select, { components } from "react-select";

import { ISelectOptions } from "../../../interfaces/selectInterface";
import {
  ITreatmentSearchCondition,
  ITreatmentSearchField,
  ITreatmentSearchInnerConnector,
  ITreatmentSingleQuery,
} from "../../../interfaces/treatmentSearchInterface";

interface IProps {
  query: ITreatmentSingleQuery;
  fieldOptions: ISelectOptions<string>[];
  displayInnerConnector: boolean;
  onQueryChange: (newQuery: ITreatmentSingleQuery) => void;
}

const { Option } = components;
const IconOption = (props: any) => (
  <Option {...props}>
    <Grid templateColumns="auto 1fr">
      <Text marginRight={6} minWidth="20px">
        {props.data.icon}
      </Text>
      <Text>{props.data.label}</Text>
    </Grid>
  </Option>
);

export const TreatmentSearchSingleQuery = ({
  query,
  displayInnerConnector,
  onQueryChange,
}: IProps) => {
  const fieldOptions: ISelectOptions<ITreatmentSearchField>[] = [
    { value: "date", label: "Datum" },
    { value: "diagnosis", label: "Diagnose" },
    { value: "notes", label: "Notizen" },
    { value: "costs", label: "Kosten" },
    { value: "customer", label: "Kunde" },
    { value: "animal", label: "Tier" },
  ];

  const conditionOptions: ISelectOptions<ITreatmentSearchCondition>[] = [
    { value: "IS", label: "ist gleich", icon: "=" },
    { value: "IS_NOT", label: "ist nicht gleich", icon: "!=" },
    { value: "IS_GREATER_THAN", label: "ist größer als", icon: ">" },
    { value: "IS_LESS_THAN", label: "ist kleiner als", icon: "<" },
    {
      value: "IS_GREATER_THAN_OR_EQUAL",
      label: "ist größer gleich",
      icon: ">=",
    },
    { value: "IS_LESS_THAN_OR_EQUAL", label: "ist kleiner gleich", icon: "<=" },
    { value: "CONTAINS", label: "enthält", icon: <>&sub;</> },
  ];

  const connectorOptions: ISelectOptions<ITreatmentSearchInnerConnector>[] = [
    { value: "AND", label: "und" },
    { value: "OR", label: "oder" },
    { value: "AND NOT", label: "und nicht" },
    { value: "OR NOT", label: "oder nicht" },
  ];

  const handleFieldChange = (
    selected: ISelectOptions<ITreatmentSearchField> | null
  ) => {
    if (selected) {
      onQueryChange({ ...query, field: selected.value || undefined });
    }
  };

  const handleConditionChange = (
    selected: ISelectOptions<ITreatmentSearchCondition> | null
  ) => {
    onQueryChange({ ...query, condition: selected?.value || undefined });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange({ ...query, value: e.target.value });
  };

  const handleConnectorChange = (
    newConnector: ITreatmentSearchInnerConnector
  ) => {
    onQueryChange({ ...query, connector: newConnector });
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" w="full" gap={4}>
      <GridItem>
        <Menu>
          {displayInnerConnector && (
            <MenuButton
              as={Button}
              rightIcon={<Icon as={CaretDown} />}
              w="full"
              fontSize="sm"
            >
              {connectorOptions
                .find((option) => option.value === query.connector)
                ?.label.toUpperCase()}
            </MenuButton>
          )}
          {!displayInnerConnector && <Box></Box>}
          <MenuList>
            {connectorOptions.map((option, idx) => (
              <MenuItem
                key={idx}
                onClick={() => handleConnectorChange(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </GridItem>

      <GridItem colSpan={2}>
        <FormControl>
          <Select
            isClearable
            isSearchable
            options={fieldOptions}
            value={fieldOptions.find((option) => option.value === query.field)}
            onChange={handleFieldChange}
            placeholder="Spalte auswählen..."
          />
        </FormControl>
      </GridItem>

      <GridItem colSpan={2}>
        <FormControl>
          <Select
            isClearable
            isSearchable
            options={conditionOptions}
            value={conditionOptions.find(
              (option) => option.value === query.condition
            )}
            onChange={handleConditionChange}
            placeholder="Bedingung auswählen..."
            components={{ Option: IconOption }}
          />
        </FormControl>
      </GridItem>

      <GridItem colSpan={2}>
        <FormControl>
          <Input
            type="text"
            onChange={handleValueChange}
            value={query.value}
            placeholder="Wert eingeben"
            backgroundColor="white"
          />
        </FormControl>
      </GridItem>
    </Grid>
  );
};

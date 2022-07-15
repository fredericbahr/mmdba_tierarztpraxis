import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CaretDown } from "phosphor-react";
import React from "react";
import Select from "react-select";

import { ISelectOptions } from "../../../interfaces/selectInterface";
import {
  ITreatmentSearchCondition,
  ITreatmentSearchInnerConnector,
  ITreatmentSingleQuery,
} from "../../../interfaces/treatmentSearchInterface";

interface IProps {
  query: ITreatmentSingleQuery;
  fieldOptions: ISelectOptions<string>[];
  onQueryChange: (newQuery: ITreatmentSingleQuery) => void;
}

export const TreatmentSearchSingleQuery = ({
  query,
  fieldOptions,
  onQueryChange,
}: IProps) => {
  const conditionOptions: ISelectOptions<ITreatmentSearchCondition>[] = [
    { value: "IS", label: "ist gleich" },
    { value: "IS_NOT", label: "ist nicht gleich" },
    { value: "IS_GREATER_THAN", label: "ist größer als" },
    { value: "IS_LESS_THAN", label: "ist kleiner als" },
    { value: "IS_GREATER_THAN_OR_EQUAL", label: "ist größer gleich" },
    { value: "IS_LESS_THAN_OR_EQUAL", label: "ist kleiner gleich" },
  ];

  const connectorOptions: ISelectOptions<ITreatmentSearchInnerConnector>[] = [
    { value: "AND", label: "und" },
    { value: "OR", label: "oder" },
    { value: "AND NOT", label: "und nicht" },
    { value: "OR NOT", label: "oder nicht" },
  ];

  const handleFieldChange = (selected: ISelectOptions<string> | null) => {
    if (selected) {
      onQueryChange({ ...query, field: selected.value });
    }
  };

  const handleConditionChange = (
    selected: ISelectOptions<ITreatmentSearchCondition> | null
  ) => {
    if (selected) {
      onQueryChange({ ...query, condition: selected.value });
    }
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
    <HStack>
      <Menu>
        {query.connector && (
          <MenuButton as={Button} rightIcon={<Icon as={CaretDown} />}>
            {query.connector}
          </MenuButton>
        )}
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

      <FormControl w="sm">
        <FormLabel>Spalte</FormLabel>
        <Select
          isClearable
          isSearchable
          options={fieldOptions}
          value={fieldOptions.find((option) => option.value === query.field)}
          onChange={handleFieldChange}
          placeholder="Spalte auswählen..."
        />
      </FormControl>
      <FormControl w="sm">
        <FormLabel>Bedingung</FormLabel>
        <Select
          isClearable
          isSearchable
          options={conditionOptions}
          value={conditionOptions.find(
            (option) => option.value === query.condition
          )}
          onChange={handleConditionChange}
          placeholder="Bedingung auswählen..."
        />
      </FormControl>
      <FormControl>
        <FormLabel>Kriterium</FormLabel>
        <Input type="text" onChange={handleValueChange} value={query.value} />
      </FormControl>
    </HStack>
  );
};

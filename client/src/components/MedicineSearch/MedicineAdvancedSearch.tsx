import {
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Plus, TrashSimple } from "phosphor-react";
import React from "react";
import Select from "react-select";

import {
  IMedicneAdvancedSearchKeyword,
  ISearchOperator,
  ISearchTarget,
} from "../../interfaces/medicineInterface";
import { ISelectOptions } from "../../interfaces/selectInterface";

interface IProps {
  amount: number;
  keywords: IMedicneAdvancedSearchKeyword[];
  searchTarget: ISearchTarget;
  onInputChange: (keyword: string, index: number) => void;
  onKeywordSearchAdd: () => void;
  onKeywordSearchDelete: (idx: number) => void;
  onSearchOperatorChange: (
    index: number,
    selected?: ISelectOptions<ISearchOperator> | null
  ) => void;
  onSearchTargetChange: (
    selected: ISelectOptions<ISearchTarget> | null
  ) => void;
}

export const MedicineAdvancedSearch = ({
  amount,
  keywords,
  searchTarget,
  onInputChange,
  onKeywordSearchAdd,
  onKeywordSearchDelete,
  onSearchOperatorChange,
  onSearchTargetChange,
}: IProps) => {
  const searchTargetOptions: ISelectOptions<ISearchTarget>[] = [
    { value: "name", label: "Name" },
    { value: "description", label: "Beschreibung" },
  ];

  const operatorOptions: ISelectOptions<ISearchOperator>[] = [
    { value: "&", label: "Und" },
    { value: "|", label: "Oder" },
    { value: "<->", label: "Gefolgt von" },
  ];

  return (
    <Stack>
      <HStack>
        <Text>Stichwortsuche in</Text>
        <Select
          options={searchTargetOptions}
          onChange={onSearchTargetChange}
          value={searchTargetOptions.find(
            (option) => option.value === searchTarget
          )}
        />
      </HStack>

      <form>
        <Stack spacing={4}>
          {Array.from({ length: amount }, (_, idx: number) => {
            return (
              <VStack key={idx} spacing={4}>
                {idx > 0 && (
                  <Select
                    options={operatorOptions}
                    onChange={(
                      selected: ISelectOptions<ISearchOperator> | null
                    ) => onSearchOperatorChange(idx, selected)}
                    value={operatorOptions.find(
                      (option) => option.value === keywords[idx].operator
                    )}
                  />
                )}
                <FormControl flex="1">
                  <HStack>
                    <Input
                      type="text"
                      placeholder="Stichwort..."
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onInputChange(event.target.value, idx)
                      }
                      value={keywords[idx].keyword}
                    />
                    {idx > 0 && (
                      <IconButton
                        aria-label="Delete Keyword"
                        icon={<Icon as={TrashSimple} />}
                        onClick={() => onKeywordSearchDelete(idx)}
                      />
                    )}
                  </HStack>
                </FormControl>
              </VStack>
            );
          })}
          <Button
            leftIcon={<Icon as={Plus} />}
            onClick={onKeywordSearchAdd}
            variant="ghost"
          >
            Weitere Stichwörter
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import {
  IMedicneAdvancedSearchKeyword,
  ISearchOperator,
  ISearchTarget,
} from "../../interfaces/medicineInterface";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { MedicineAdvancedSearch } from "./MedicineAdvancedSearch";

interface IProps {
  setResults: (results: any) => void;
}

export const MedicineSearch = ({ setResults }: IProps) => {
  const { isLoading, error, post } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [medicineNameSearch, setMedicineNameSearch] = useState("");
  const [medicineKeywordsSearch, setMedicineKeywordsSearch] = useState<
    IMedicneAdvancedSearchKeyword[]
  >([{ keyword: "", operator: "&" }]);
  const [keywordSearchAmount, setKeywordSearchAmount] = useState(1);
  const [searchTarget, setSearchTarget] = useState<ISearchTarget>("name");

  const handleMedicineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineNameSearch(e.target.value);
  };

  const handleMedicineKeywordsChange = (keyword: string, index: number) => {
    const newMedicineKeywordsSearch = [...medicineKeywordsSearch];
    newMedicineKeywordsSearch[index].keyword = keyword;
    setMedicineKeywordsSearch(newMedicineKeywordsSearch);
  };

  const handleSearchOperatorChange = (
    index: number,
    selected?: ISelectOptions<ISearchOperator> | null
  ) => {
    if (selected) {
      const newMedicineKeywordsSearch = [...medicineKeywordsSearch];
      newMedicineKeywordsSearch[index].operator = selected.value;
      setMedicineKeywordsSearch(newMedicineKeywordsSearch);
    }
  };

  const handleKeywordSearchAmountAdd = () => {
    setKeywordSearchAmount(keywordSearchAmount + 1);
    setMedicineKeywordsSearch([
      ...medicineKeywordsSearch,
      { keyword: "", operator: "&" },
    ]);
  };

  const handleKeywordSearchAmountDelete = (idx: number) => {
    setMedicineKeywordsSearch(
      medicineKeywordsSearch.filter((_, i) => i !== idx)
    );
    setKeywordSearchAmount(keywordSearchAmount - 1);
  };

  const handleSearchTargetChange = (
    selected: ISelectOptions<ISearchTarget> | null
  ) => {
    if (selected) {
      setSearchTarget(selected.value);
    }
  };

  const handleSearch = async () => {
    if (
      medicineKeywordsSearch.length > 1 ||
      medicineKeywordsSearch[0].keyword !== ""
    ) {
      return await handleAdvancedSearch();
    }

    return await handleNameSearch();
  };

  const handleAdvancedSearch = async () => {
    const { medicines } = await post(
      `/api/medicine/search/advanced/${searchTarget}`,
      {
        keywords: medicineKeywordsSearch,
      }
    );

    if (!medicines || error) {
      return showErrorToast("Fehler beim Suchen", "");
    }

    setResults(medicines);
  };

  const handleNameSearch = async () => {
    const { medicines } = await post("/api/medicine/search", {
      name: medicineNameSearch,
    });

    if (!medicines || error) {
      return showErrorToast("Fehler beim Suchen", "");
    }

    setResults(medicines);
  };

  return (
    <>
      <Heading as="h3" size="lg">
        Medikamentensuche
      </Heading>
      <Box boxShadow="md" rounded="md" px={4} py={8}>
        <Stack spacing={8} w="full">
          <form>
            <FormControl flex="1">
              <FormLabel htmlFor="nameSearch">Name des Medikaments</FormLabel>
              <Input
                id="nameSearch"
                type="text"
                placeholder="Medikamentname..."
                disabled={
                  medicineKeywordsSearch.length > 1 ||
                  medicineKeywordsSearch[0].keyword !== ""
                }
                onChange={handleMedicineNameChange}
              />
            </FormControl>
          </form>

          <Accordion allowToggle marginTop={8} size="xs">
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                <AccordionIcon />
                <Text flex="1">Erweiterte Suche</Text>
              </AccordionButton>

              <AccordionPanel>
                <MedicineAdvancedSearch
                  amount={keywordSearchAmount}
                  keywords={medicineKeywordsSearch}
                  searchTarget={searchTarget}
                  onKeywordSearchAdd={handleKeywordSearchAmountAdd}
                  onKeywordSearchDelete={handleKeywordSearchAmountDelete}
                  onInputChange={handleMedicineKeywordsChange}
                  onSearchOperatorChange={handleSearchOperatorChange}
                  onSearchTargetChange={handleSearchTargetChange}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button
            onClick={handleSearch}
            isLoading={isLoading}
            leftIcon={<Icon as={MagnifyingGlass} />}
            disabled={
              medicineNameSearch === "" &&
              medicineKeywordsSearch[0].keyword == ""
            }
          >
            Suchen
          </Button>
        </Stack>
      </Box>
    </>
  );
};

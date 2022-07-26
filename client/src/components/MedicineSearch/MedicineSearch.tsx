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
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import {
  IMedicine,
  IMedicneAdvancedSearchKeyword,
  ISearchOperator,
  ISearchTarget,
} from "../../interfaces/medicineInterface";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { ITreatmentSearchRef } from "../../pages/Treatment/Treatment";
import { MedicineAdvancedSearch } from "./MedicineAdvancedSearch";

interface IProps {
  setResults: (results: IMedicine[]) => void;
}

const MedicineSearch = ({ setResults }: IProps, ref?: React.Ref<ITreatmentSearchRef>) => {
  const { isLoading, error, post } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [medicineNameSearch, setMedicineNameSearch] = useState("");
  const [medicineKeywordsSearch, setMedicineKeywordsSearch] = useState<
    IMedicneAdvancedSearchKeyword[]
  >([{ keyword: "", operator: "&" }]);
  const [keywordSearchAmount, setKeywordSearchAmount] = useState(1);
  const [searchTarget, setSearchTarget] = useState<ISearchTarget>("name");
  const [
    isConnectKeywordsWithOrTriggered,
    setIsConnectKeywordsWithOrTriggered,
  ] = useState(false);

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

  const handleConnectKeywordsWithOr = () => {
    const newMedicineKeywordsSearch: IMedicneAdvancedSearchKeyword[] =
      medicineKeywordsSearch.map((keywordSearch) => ({
        ...keywordSearch,
        operator: "|",
      }));
    setMedicineKeywordsSearch(newMedicineKeywordsSearch);
    setIsConnectKeywordsWithOrTriggered(true);
  };

  const resetSearch = () => {
    setMedicineNameSearch("");
    setMedicineKeywordsSearch([{ keyword: "", operator: "&" }]);
    setKeywordSearchAmount(1);
    setSearchTarget("name");
    setIsConnectKeywordsWithOrTriggered(false);
  };

  useEffect(() => {
    if (isConnectKeywordsWithOrTriggered) {
      handleSearch();
      setIsConnectKeywordsWithOrTriggered(false);
    }
  }, [isConnectKeywordsWithOrTriggered]);

  useImperativeHandle(ref, () => ({
    ...(ref as React.RefObject<ITreatmentSearchRef>).current,
    handleConnectKeywordsWithOr,
    resetSearch,
  }));

  return (
    <>
      <Heading as="h3" size="lg" textAlign="center">
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
                value={medicineNameSearch}
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
              <AccordionButton  _expanded={{ bg: "blue.500", color: "white" }}>
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

export default forwardRef(MedicineSearch);

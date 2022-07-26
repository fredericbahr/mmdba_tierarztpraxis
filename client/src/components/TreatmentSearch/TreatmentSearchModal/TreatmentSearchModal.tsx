import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { useState } from "react";
import Select from "react-select";

import { ISelectOptions } from "../../../interfaces/selectInterface";
import { ITreatment } from "../../../interfaces/treatmentInterface";
import {
  ITreatmentSearchRef,
  ITreatmentSearchType,
} from "../../../pages/Treatment/Treatment";
import TreatmentFilterSearch from "../TreatmentFilterSearch/TreatmentFilterSearch";
import TreatmentImageSearch from "../TreatmentImageSearch/TreatmentImageSearch";

interface IProps {
  isOpen: boolean;
  searchType: ITreatmentSearchType;
  onClose: () => void;
  setTreatmentSearchType: (treatmentSearchType: ITreatmentSearchType) => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
}

const treatmentSearchTypeOptions: ISelectOptions<ITreatmentSearchType>[] = [
  { value: "filter", label: "Filter" },
  { value: "image", label: "Bild" },
];

const TreatmentSearchModal = (
  {
    isOpen,
    searchType,
    onClose,
    setTreatmentSearchType,
    setSearchResults,
  }: IProps,
  ref?: React.Ref<ITreatmentSearchRef>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    await (
      ref as React.RefObject<ITreatmentSearchRef>
    ).current?.handleSearch?.();
  };

  const handleSearchTypeChange = (
    selected?: ISelectOptions<ITreatmentSearchType> | null
  ) => {
    setTreatmentSearchType(selected?.value || "filter");
  };

  const treatmentSearchTypeMap = {
    filter: (
      <TreatmentFilterSearch
        ref={ref}
        onClose={onClose}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
    ),
    image: (
      <TreatmentImageSearch
        onClose={onClose}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        ref={ref}
      />
    ),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Behandlung suchen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel m={0} marginRight={4}>
                Suchen mit
              </FormLabel>
              <Select
                options={treatmentSearchTypeOptions}
                value={treatmentSearchTypeOptions.find(
                  (option) => option.value === searchType
                )}
                onChange={handleSearchTypeChange}
              />
            </FormControl>
            {treatmentSearchTypeMap[searchType]}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSearch} isLoading={isLoading}>
            Suche
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(TreatmentSearchModal);

import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect } from "react";
  import Select from "react-select";

  import { useCustomToast } from "../../hooks/useCustomToast";
  import { useFetch } from "../../hooks/useFetch";
  import { IRaceOption } from "../../interfaces/autocompleteOptionInterfaces";
  import { ISelectOptions } from "../../interfaces/selectInterface";
  
  interface IProps {
    raceId: number | null;
    speciesId: number | null;
    onRaceChange: (selected?: ISelectOptions<number> | null) => void;
  }
  
  interface IExtendedSelectOptions<T> extends ISelectOptions<T> {
    speciesId: number;
  }
  
  export const SearchRaceChooseStep = ({
    raceId,
    speciesId,
    onRaceChange,
  }: IProps) => {
    const { isOpen } = useDisclosure();
    const { showErrorToast } = useCustomToast();
  
    const [options, setOptions] = React.useState<
      IExtendedSelectOptions<number>[]
    >([]);
    const { isLoading, error, get } = useFetch();
  
    useEffect(() => {
      const fetchOptions = async () => {
        const { races } = await get(`/api/races/${speciesId}`);
  
        if (!races || error) {
          showErrorToast("Fehler", "Fehler beim Laden der Rassen");
        }
  
        if (races && !error) {
          const raceOptions: IExtendedSelectOptions<number>[] = races.map(
            (race: IRaceOption) => ({
              value: race.id,
              label: race.name,
              speciesId: race.speciesId,
            })
          );
  
          setOptions(raceOptions);
        }
      };
  
      if (!isOpen) {
        fetchOptions();
      }
    }, [isOpen]);
  
    /**
     * Checks if the race id is viable wiht the provided species id
     * @returns true, if race id is viable with species id
     */
    const isRaceIdNotIncludedInOptions = () =>
      Array.isArray(options) &&
      options.length > 0 &&
      !options.some((o) => o.value === raceId);
  
    useEffect(() => {
      if (isRaceIdNotIncludedInOptions()) {
        onRaceChange(null);
      }
    }, [raceId, options]);
  
    return (
      <>
        <VStack justify="center" align="center" w="full" spacing={8}>
          <FormControl w="sm">
            <FormLabel>Tierrasse</FormLabel>
            <Select
              isClearable
              isSearchable
              isLoading={isLoading}
              options={options}
              value={options.find((option) => option.value === raceId)}
              onChange={onRaceChange}
            />
            <FormHelperText>Wählen Sie bitte einen Tierrasse</FormHelperText>
          </FormControl>
        </VStack>
      </>
    );
  };
  
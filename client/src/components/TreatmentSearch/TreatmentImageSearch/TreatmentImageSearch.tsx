import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";

import { useCustomToast } from "../../../hooks/useCustomToast";
import { useFetch } from "../../../hooks/useFetch";
import { ITreatment } from "../../../interfaces/treatmentInterface";
import { ITreatmentSearchRef } from "../../../pages/Treatment/Treatment";
import { ImagePreview } from "../../FilePreview/ImagePreview";
import { FileUpload } from "../../FileUpload/FileUpload";

interface IProps {
  onClose: () => void;
  setSearchResults: (searchResults: ITreatment[] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const TreatmentImageSearch = (
  { setSearchResults, setIsLoading, onClose }: IProps,
  ref?: React.Ref<ITreatmentSearchRef>
) => {
  const { isLoading, error, uploadFormData } = useFetch();
  const { showErrorToast } = useCustomToast();

  const [image, setImage] = useState<File | null>(null);
  const [matchPercentage, setMatchPercentage] = useState<number>(90);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleNewFiles = (newFiles: File[]) => {
    setImage(newFiles[0]);
  };

  const handleFileDelete = () => {
    setImage(null);
  };

  const handleMatchPercentageChange = (value: number) => {
    setMatchPercentage(value);
  };

  const handleSearch = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("treatment-image", image);
      formData.append("matchPercentage", `${matchPercentage}`);

      const { treatments } = await uploadFormData(
        "/api/treatment/search/image",
        formData
      );

      if (!treatments || error) {
        showErrorToast("Fehler", "Kein ähnliches Bild wurde gefunden.");
        return setSearchResults(null);
      }

      setSearchResults(treatments);
      onClose();
    }
  };

  useImperativeHandle(ref, () => ({
    ...(ref as React.RefObject<ITreatmentSearchRef>).current,
    handleSearch,
  }));

  useEffect(() => setIsLoading(isLoading), [isLoading]);

  return (
    <Stack spacing={8}>
      <FileUpload handleNewFiles={handleNewFiles} multiple={false} />
      {image && (
        <Flex justifyContent="center" w="full">
          <ImagePreview
            files={[image]}
            columns={1}
            handleDelete={handleFileDelete}
          />
        </Flex>
      )}
      <FormControl>
        <HStack spacing={4}>
          <FormLabel m={0}>Ähnlichkeit:</FormLabel>
          <Text>{matchPercentage}%</Text>
        </HStack>
        <Slider
          aria-label="missmatch-slider"
          value={matchPercentage}
          onChange={handleMatchPercentageChange}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={0} mt="1" fontSize="sm">
            0%
          </SliderMark>
          <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
            25%
          </SliderMark>
          <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
            50%
          </SliderMark>
          <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
            75%
          </SliderMark>
          <SliderMark value={100} mt="1" ml="-2.2em" fontSize="sm">
            100%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            placement="bottom"
            isOpen={showTooltip}
            label={`${matchPercentage}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </FormControl>
    </Stack>
  );
};

export default forwardRef(TreatmentImageSearch);

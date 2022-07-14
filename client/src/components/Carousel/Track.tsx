import {
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import React from "react";

interface IProps extends FlexProps {
  progress: number;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const Track = ({
  progress,
  isNextDisabled,
  isPrevDisabled,
  handleNext,
  handlePrevious,
  ...flexProps
}: IProps) => {
  return (
    <Flex {...flexProps}>
      <HStack flex={1}>
        <IconButton
          icon={<Icon as={CaretLeft} />}
          onClick={handlePrevious}
          aria-label="Prevoius"
          variant="ghost"
          disabled={isPrevDisabled}
        />
        <Progress flex={1} h="3px" value={progress} />
        <IconButton
          icon={<Icon as={CaretRight} />}
          onClick={handleNext}
          aria-label="Next"
          variant="ghost"
          disabled={isNextDisabled}
        />
      </HStack>
    </Flex>
  );
};

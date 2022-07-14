import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { Track } from "./Track";

interface IProps {
  children: React.ReactNode[];
}

export const Carousel = ({ children }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <VStack>
      <VStack justifyContent="center">
        {children[currentIndex]}
        <Track
          width="full"
          progress={(currentIndex / (children.length - 1)) * 100}
          isNextDisabled={currentIndex === children.length - 1}
          isPrevDisabled={currentIndex === 0}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </VStack>
    </VStack>
  );
};

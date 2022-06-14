import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  onAnimalNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnimalBirthdateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnimalWeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AnimalCreateStep = ({
  onAnimalNameChange,
  onAnimalBirthdateChange,
  onAnimalWeightChange,
}: IProps) => {
  return (
    <Box marginTop={6}>
      <Heading>Tierdaten eingeben</Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="animalName">Tiername</FormLabel>
            <Input id="animalName" type="text" onChange={onAnimalNameChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="animalBirthYear">Geburtsdatum</FormLabel>
            <Input
              id="animalBirthYear"
              type="date"
              onChange={onAnimalBirthdateChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="animalWeight">Gewicht</FormLabel>
            <NumberInput>
              <NumberInputField
                id="animalWeight"
                onChange={onAnimalWeightChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
};

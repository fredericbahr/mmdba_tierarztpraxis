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
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  onAnimalNameChange: (value: string) => void;
  onAnimalBirthYearChange: (value: Date) => void;
  onAnimalWeightChange: (value: number) => void;
}

export const AnimalCreateStep = ({
  onAnimalNameChange,
  onAnimalBirthYearChange,
  onAnimalWeightChange,
}: IProps) => {
  return (
    <Box marginTop={6}>
      <Heading>Tierdaten eingeben</Heading>
      <form>
        <FormControl isRequired>
          <FormLabel htmlFor="animalName">Tiername</FormLabel>
          <Input id="animalName" type="text" onChange={() => onAnimalNameChange}/>
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel htmlFor="animalBirthYear">Geburtsdatum</FormLabel>
          <Input id="animalBirthYear" type="date" onChange={() => onAnimalBirthYearChange}/>
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel htmlFor="animalWeight">Gewicht</FormLabel>
          <NumberInput>
            <NumberInputField id="animalWeight" onChange={() => onAnimalWeightChange} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </form>
    </Box>
  );
};

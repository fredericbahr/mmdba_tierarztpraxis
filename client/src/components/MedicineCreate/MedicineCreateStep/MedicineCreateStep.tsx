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
  medicineName: string;
  medicineDosis: number | null;
  onMedicineNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMedicineDosisChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MedicineCreateStep = ({
  medicineName,
  medicineDosis,
  onMedicineNameChange,
  onMedicineDosisChange,
}: IProps) => {
  return (
    <Box marginTop={6}>
      <Heading>Medizindaten eingeben</Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="animalName">Name</FormLabel>
            <Input
              id="medicineName"
              type="text"
              onChange={onMedicineNameChange}
              value={medicineName}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="medicineDosis">Dosis:</FormLabel>
            <NumberInput defaultValue={medicineDosis || undefined}>
              <NumberInputField
                id="medicineDosis"
                onChange={onMedicineDosisChange}
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

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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  treatmentDiagnosis: string;
  treatmentNotes: string;
  treatmentPrice: number;
  treatmentDate: Date | null;
  onTreatmentDiagnosisChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onTreatmentNotesChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onTreatmentPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTreatmentDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TreatmentCreateStep = ({
  treatmentDiagnosis,
  treatmentNotes,
  treatmentDate,
  treatmentPrice,
  onTreatmentDiagnosisChange,
  onTreatmentNotesChange,
  onTreatmentPriceChange,
  onTreatmentDateChange,
}: IProps) => {
  return (
    <Box marginTop={6}>
      <Heading>Behandlung anlegen</Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="treatmentDiagnose">Diagnose</FormLabel>
            <Input
              id="treatmentDiagnose"
              type="text"
              onChange={onTreatmentDiagnosisChange}
              value={treatmentDiagnosis}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="animalBirthYear">Datum</FormLabel>
            <Input
              value={treatmentDate?.toISOString().substring(0, 10) || undefined}
              id="animalBirthYear"
              type="date"
              onChange={onTreatmentDateChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="animalWeight">Kosten</FormLabel>
            <NumberInput defaultValue={treatmentPrice || undefined}>
              <NumberInputField
                id="animalWeight"
                onChange={onTreatmentPriceChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="treatmentNotes">Notizen</FormLabel>
            <Textarea
              id="treatmentNotes"
              value={treatmentNotes}
              onChange={onTreatmentNotesChange}
            />
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
};

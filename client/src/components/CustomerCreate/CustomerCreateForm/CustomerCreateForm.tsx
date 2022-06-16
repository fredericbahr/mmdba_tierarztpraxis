import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStreetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onZipChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomerCreateForm = ({
  onNameChange,
  onStreetChange,
  onZipChange,
  onCityChange,
  onPhoneNumberChange,
}: IProps) => {
  return (
    <form>
      <FormControl isRequired>
        <FormLabel htmlFor="customerName">Name</FormLabel>
        <Input type="text" id="customerName" onChange={onNameChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="customerStreet">Straße</FormLabel>
        <Input type="text" id="customerStreet" onChange={onStreetChange} />
      </FormControl>
      <HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="customerZIP">Postleitzahl</FormLabel>
          <NumberInput>
            <NumberInputField id="customerZIP" onChange={onZipChange} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="customerCity">Ort</FormLabel>
          <Input type="text" id="customerCity" onChange={onCityChange} />
        </FormControl>
      </HStack>
      <FormControl isRequired>
        <FormLabel htmlFor="customerPhoneNumber">Telefonnummer</FormLabel>
        <Input
          type="text"
          id="customerPhoneNumber"
          onChange={onPhoneNumberChange}
        />
      </FormControl>
    </form>
  );
};

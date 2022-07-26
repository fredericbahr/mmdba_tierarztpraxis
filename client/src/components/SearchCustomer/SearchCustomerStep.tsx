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
    customerName: string;
    onCustomerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customerCreatedAt: Date | null;
    onCustomerCreatedAtChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customerCity: string;
    onCustomerCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customerPhoneNumber: string;
    onCustomerPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customerPlz: number | null;
    onCustomerPlzChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    customerStreet: string;
    onCustomerStreetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const SearchCustomerStep = ({
    customerName,
    onCustomerNameChange,
    customerCreatedAt,
    onCustomerCreatedAtChange,
    customerCity,
    onCustomerCityChange,
    customerPhoneNumber,
    onCustomerPhoneNumberChange,
    customerPlz,
    onCustomerPlzChange,
    customerStreet,
    onCustomerStreetChange

  }: IProps) => {
    return (
      <Box marginTop={6}>
        <Heading>Kundendaten eingeben</Heading>
        <form>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="customerName">Kundename</FormLabel>
              <Input
                id="customerName"
                type="text"
                onChange={onCustomerNameChange}
                value={customerName}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="customerCity">Ort</FormLabel>
              <Input
                id="customerCity"
                type="text"
                onChange={onCustomerCityChange}
                value={customerCity}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="customerPhoneNumber">Telefonnummer</FormLabel>
              <Input
                id="customerPhoneNumber"
                type="text"
                onChange={onCustomerPhoneNumberChange}
                value={customerPhoneNumber}
              />
            </FormControl>
  
            <FormControl>
              <FormLabel htmlFor="customerPlz">Postleitzahl</FormLabel>
              <NumberInput defaultValue={customerPlz || undefined}>
                <NumberInputField
                  id="customerPlz"
                  onChange={onCustomerPlzChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="customerStreet">Straße</FormLabel>
              <Input
                id="customerStreet"
                type="text"
                onChange={onCustomerStreetChange}
                value={customerStreet}
              />
            </FormControl>
          </VStack>
        </form>
      </Box>
    );
  };
  
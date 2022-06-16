import { Box, Button, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { UploadSimple } from "phosphor-react";
import React, { useRef } from "react";

export const FileUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
    }
  };

  const handleFileChooseClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      my={4}
      borderColor="gray.300"
      borderStyle="dashed"
      borderWidth="2px"
      rounded="md"
      shadow="sm"
      p={8}
    >
      <Text fontWeight="extrabold" fontSize="xl" color="blue.900">
        Dateien hier ablegen
      </Text>
      <Text color="blue.800">oder</Text>
      <Button
        leftIcon={<Icon as={UploadSimple} />}
        size="lg"
        onClick={handleFileChooseClick}
      >
        Dateien auswählen
      </Button>
      <Input
        display="none"
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
      />
    </VStack>
  );
};

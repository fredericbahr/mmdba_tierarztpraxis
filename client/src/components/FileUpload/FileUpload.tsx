import { Box, Button, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { UploadSimple } from "phosphor-react";
import React, { useRef, useState } from "react";

interface IProps {
  setFiles: (files: File[]) => void;
}

export const FileUpload = ({ setFiles }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      setFiles([...files, ...Array.from(files)]);
    }
  };

  const handleFileChooseClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    if (event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      setFiles([...files, ...Array.from(files)]);
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
      position="relative"
    >
      {!dragActive ? (
        <>
          <Text fontWeight="extrabold" fontSize="xl" color="blue.900">
            Dateien hier ablegen
          </Text>
          <Text color="blue.800">oder</Text>
          <Button
            leftIcon={<Icon as={UploadSimple} />}
            size="lg"
            onClick={handleFileChooseClick}
            zIndex={1}
          >
            Dateien auswählen
          </Button>
          <Input
            display="none"
            ref={inputRef}
            onChange={handleFileChange}
            type="file"
            multiple
            accept="image/jpeg,image/gif,image/png,video/mp4,video/x-m4v,application/pdf"
          />
        </>
      ) : (
        <Text fontWeight="extrabold" fontSize="xl" color="blue.900">
          Dateien fallen lassen
        </Text>
      )}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        p={0}
      />
    </VStack>
  );
};

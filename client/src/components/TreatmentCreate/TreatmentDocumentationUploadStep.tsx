import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import { FilePreview } from "../FilePreview/FilePreview";
import { FileUpload } from "../FileUpload/FileUpload";

interface IProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export const TreatmentDocumentationUploadStep = ({
  files,
  onFilesChange,
}: IProps) => {
  const handleNewFiles = (newFiles: File[]) => {
    onFilesChange([...files, ...newFiles]);
  };

  return (
    <Box marginTop={6}>
      <Heading>Dokumentation hochladen</Heading>
      <form>
        <FileUpload handleNewFiles={handleNewFiles} />
        <FilePreview handleFileChange={onFilesChange} files={files} />
      </form>
    </Box>
  );
};

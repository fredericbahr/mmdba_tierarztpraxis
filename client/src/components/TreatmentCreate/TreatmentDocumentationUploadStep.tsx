import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import { FilePreview } from "../FilePreview/FilePreview";
import { FileUpload } from "../FileUpload/FileUpload";

export const TreatmentDocumentationUploadStep = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleNewFiles = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

  return (
    <Box marginTop={6}>
      <Heading>Dokumentation hochladen</Heading>
      <form>
        <FileUpload handleNewFiles={handleNewFiles} />
        <FilePreview handleFileChange={handleFileChange} files={files} />
      </form>
    </Box>
  );
};

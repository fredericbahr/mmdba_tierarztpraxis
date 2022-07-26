import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import { PDFPreview } from "../../FilePreview/PDFPreview";
import { FileUpload } from "../../FileUpload/FileUpload";

interface IProps {
  file: File | null;
  onFileChange: (files: File | null) => void;
}

export const MedicineDescriptionUpload = ({ file, onFileChange }: IProps) => {
  const handleNewFiles = (files: File[]) => {
    onFileChange(files[0]);
  };

  const handleDelete = () => {
    onFileChange(null);
  };

  return (
    <>
      <FileUpload handleNewFiles={handleNewFiles} multiple={false} />
      {file && (
        <Box marginTop={8}>
          <Heading as="h3">Beschreibung</Heading>
          <Box mx={8}>
            <PDFPreview
              files={file ? [file] : []}
              handleDelete={() => handleDelete()}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import { FileUpload } from "../FileUpload/FileUpload";

export const TreatmentDocumentationUploadStep = () => {
  return (
    <Box marginTop={6}>
      <Heading>Dokumentation hochladen</Heading>
      <form>
        <FileUpload />
      </form>
    </Box>
  );
};

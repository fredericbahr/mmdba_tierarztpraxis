import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import { FilePreview } from "../FilePreview/FilePreview";
import { FileUpload } from "../FileUpload/FileUpload";

export const TreatmentDocumentationUploadStep = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Box marginTop={6}>
      <Heading>Dokumentation hochladen</Heading>
      <form>
        <FileUpload setFiles={setFiles} />
        <FilePreview files={files}/>
      </form>
    </Box>
  );
};

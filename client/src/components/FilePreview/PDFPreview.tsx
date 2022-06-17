import "./PDFPreview.css";

import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Document, Page } from "react-pdf";

import { useCustomToast } from "../../hooks/useCustomToast";

interface IProps {
  files: File[];
}

export const PDFPreview = ({ files }: IProps) => {
  const { showErrorToast } = useCustomToast();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
      {files.map((file, index) => {
        return (
          <GridItem
            key={index}
            maxW="40"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Document
              file={file}
              onLoadError={(e: Error) => {
                console.log(e);
                showErrorToast("Fehler", "Fehler beim Laden einer PDF Datei");
              }}
            >
              <Page pageNumber={1} />
            </Document>
          </GridItem>
        );
      })}
    </Grid>
  );
};

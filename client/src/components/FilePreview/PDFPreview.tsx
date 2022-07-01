import "./PDFPreview.css";

import { Grid } from "@chakra-ui/react";
import React from "react";
import { Document, Page } from "react-pdf";

import { useCustomToast } from "../../hooks/useCustomToast";
import { PreviewItem } from "./PreviewItem";

interface IProps {
  files: File[];
  handleDelete: (index: number) => void;
}

export const PDFPreview = ({ files, handleDelete }: IProps) => {
  const { showErrorToast } = useCustomToast();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
      {files.map((file, index) => {
        return (
          <PreviewItem
            key={index}
            handleDelete={handleDelete}
            file={file}
            index={index}
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
          </PreviewItem>
        );
      })}
    </Grid>
  );
};

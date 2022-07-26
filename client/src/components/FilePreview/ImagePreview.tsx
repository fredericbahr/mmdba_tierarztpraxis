import { Grid, Image } from "@chakra-ui/react";
import React from "react";

import { PreviewItem } from "./PreviewItem";

interface IProps {
  files: File[];
  columns?: number;
  handleDelete: (index: number) => void;
}

export const ImagePreview = ({ files, columns = 4, handleDelete }: IProps) => {
  return (
    <Grid
      templateColumns={`repeat(${columns}, 1fr)`}
      gridGap={8}
      alignItems="center"
    >
      {files.map((file, index) => {
        return (
          <PreviewItem
            key={index}
            handleDelete={handleDelete}
            file={file}
            index={index}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              objectFit="contain"
              flex={1}
            />
          </PreviewItem>
        );
      })}
    </Grid>
  );
};

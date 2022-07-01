import { Grid, Image } from "@chakra-ui/react";
import React from "react";

import { PreviewItem } from "./PreviewItem";

interface IProps {
  files: File[];
  handleDelete: (index: number) => void;
}

export const ImagePreview = ({ files, handleDelete }: IProps) => {
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

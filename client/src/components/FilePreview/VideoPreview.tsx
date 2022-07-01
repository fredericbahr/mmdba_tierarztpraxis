import { Grid } from "@chakra-ui/react";
import React from "react";

import { PreviewItem } from "./PreviewItem";

interface IProps {
  files: File[];
  handleDelete: (index: number) => void;
}

export const VideoPreview = ({ files, handleDelete }: IProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gridGap={8} alignItems="center">
      {files.map((file, index) => {
        return (
          <PreviewItem
            key={index}
            handleDelete={handleDelete}
            file={file}
            index={index}
          >
            <video controls width="100%" height="100%">
              <source src={URL.createObjectURL(file)} />
              Your browser does not support the video tag.
            </video>
          </PreviewItem>
        );
      })}
    </Grid>
  );
};

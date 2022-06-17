import { Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";

interface IProps {
  files: File[];
}

export const ImagePreview = ({ files }: IProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
      {files.map((file, index) => {
        return (
          <GridItem key={index} maxW="40" display="flex" flexDirection="column" alignItems="center">
            <Image src={URL.createObjectURL(file)} alt="Preview" objectFit="contain" flex={1} />
            <p>{file.name}</p>
          </GridItem>
        );
      })}
    </Grid>
  );
};

import { Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ImagePreview } from "./ImagePreview";
import { PDFPreview } from "./PDFPreview";
import { VideoPreview } from "./VideoPreview";

interface IProps {
  files: File[];
}

export const FilePreview = ({ files }: IProps) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  useEffect(() => {
    const pdfFiles = files.filter((file) => file.type.includes("pdf"));
    const imageFiles = files.filter((file) => file.type.includes("image"));
    const videoFiles = files.filter((file) => file.type.includes("video"));

    setPdfFiles(pdfFiles);
    setImageFiles(imageFiles);
    setVideoFiles(videoFiles);
  }, [files]);

  const isNotEmpty = (files: File[]) => files.length > 0;

  return (
    <VStack>
      {isNotEmpty(pdfFiles) && (
        <VStack>
          <Heading as="h3">Befunde</Heading>
          <PDFPreview files={pdfFiles} />
        </VStack>
      )}
      {isNotEmpty(imageFiles) && (
        <VStack>
          <Heading as="h3">Bilddokumentation</Heading>
          <ImagePreview files={imageFiles} />
        </VStack>
      )}
      {isNotEmpty(videoFiles) && (
        <VStack>
          <Heading as="h3">Videodokumentation</Heading>
          <VideoPreview files={videoFiles} />
        </VStack>
      )}
    </VStack>
  );
};

import { Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ImagePreview } from "./ImagePreview";
import { PDFPreview } from "./PDFPreview";
import { VideoPreview } from "./VideoPreview";

interface IProps {
  files: File[];
  handleFileChange: (files: File[]) => void;
}

export const FilePreview = ({ files, handleFileChange }: IProps) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const handlePDFDelete = (index: number) => {
    const remainingFiles = pdfFiles.filter((_, i) => i !== index);
    handleFileChange([...remainingFiles, ...imageFiles, ...videoFiles]);
  };

  const handleImageDelete = (index: number) => {
    const remainingFiles = imageFiles.filter((_, i) => i !== index);
    handleFileChange([...pdfFiles, ...remainingFiles, ...videoFiles]);
  };

  const handleVideoDelete = (index: number) => {
    const remainingFiles = videoFiles.filter((_, i) => i !== index);
    handleFileChange([...pdfFiles, ...imageFiles, ...remainingFiles]);
  };

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
    <VStack alignItems="start" spacing={12} mx={8}>
      {isNotEmpty(pdfFiles) && (
        <VStack alignItems="start" spacing={2}>
          <Heading as="h3">Befunde</Heading>
          <PDFPreview files={pdfFiles} handleDelete={handlePDFDelete} />
        </VStack>
      )}
      {isNotEmpty(imageFiles) && (
        <VStack alignItems="start" spacing={2}>
          <Heading as="h3">Bilddokumentation</Heading>
          <ImagePreview files={imageFiles} handleDelete={handleImageDelete} />
        </VStack>
      )}
      {isNotEmpty(videoFiles) && (
        <VStack alignItems="start" spacing={2}>
          <Heading as="h3">Videodokumentation</Heading>
          <VideoPreview files={videoFiles} handleDelete={handleVideoDelete} />
        </VStack>
      )}
    </VStack>
  );
};

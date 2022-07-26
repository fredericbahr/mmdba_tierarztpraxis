import {
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

interface IProps {
  pdf: Blob;
  isOpen: boolean;
  onClose: () => void;
}

export const PDFFullScreenModal = ({ pdf, isOpen, onClose }: IProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) =>
    setPageNumber((prevPageNumber) => prevPageNumber + offset);

  const previousPage = () => changePage(-1);

  const nextPage = () => changePage(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={1} />
        <ModalBody py={4}>
          <Document
            file={pdf}
            onLoadError={(e: Error) => console.log(e)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <HStack w="full" justifyContent="center" alignItems="center" marginTop={8}>
            <IconButton
              aria-label="Previous Page"
              icon={<Icon as={CaretLeft} />}
              colorScheme="gray"
              variant="ghost"
              onClick={previousPage}
              disabled={pageNumber === 1}
            />
            <Text>
              {pageNumber} von {numPages}
            </Text>
            <IconButton
              aria-label="Next Page"
              icon={<Icon as={CaretRight} />}
              colorScheme="gray"
              variant="ghost"
              onClick={nextPage}
              disabled={pageNumber === numPages}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { Buffer } from "buffer";
import React from "react";

import { IPhoto } from "../../interfaces/photoInterface";
import { Carousel } from "../Carousel/Carousel";

interface IProps {
  photos: IPhoto[];
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoViewModal = ({ photos, isOpen, onClose }: IProps) => {
  const getURL = (blob: Buffer, mimeType: string) => {
    return `data:${mimeType};base64,${Buffer.from(blob).toString("base64")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Carousel>
            {photos.map((photo) => {
              return (
                <Image
                  width="30vw"
                  key={photo.id}
                  src={getURL(photo.blob, photo.mimeType)}
                  alt="Behandlungsfoto"
                />
              );
            })}
          </Carousel>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

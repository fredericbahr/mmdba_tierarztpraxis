import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { Buffer } from "buffer";
import React from "react";

import { IVideo } from "../../interfaces/videoInterface";
import { Carousel } from "../Carousel/Carousel";

interface IProps {
  videos: IVideo[];
  isOpen: boolean;
  onClose: () => void;
}

export const VideoViewModal = ({ videos, isOpen, onClose }: IProps) => {
  const getURL = (blob: Buffer, mimeType: string) => {
    return `data:${mimeType};base64,${Buffer.from(blob).toString("base64")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {videos.length > 0 && (
            <Carousel>
              {videos.map((video) => (
                <video controls key={video.id} width="95%">
                  <source
                    src={getURL(video.blob, video.mimeType)}
                    type="video/mp4"
                  />
                </video>
              ))}
            </Carousel>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

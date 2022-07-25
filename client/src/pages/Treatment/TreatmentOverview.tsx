import { Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import { FindingViewModal } from "../../components/FindingViewModal/FindingViewModal";
import { PhotoViewModal } from "../../components/PhotoViewModal/PhotoViewModal";
import { TreatmentTableOverview } from "../../components/TreatementTableOverview/TreatmentTableOverview";
import { VideoViewModal } from "../../components/VideoViewModal/VideoViewModal";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  treatments: ITreatment[];
  isLoading: boolean;
  deleteTreatment: (id: number) => void;
}

export const TreatmentOverview = ({
  treatments,
  isLoading,
  deleteTreatment,
}: IProps) => {
  const {
    isOpen: isOpenPhotoModal,
    onOpen: onOpenPhotoModal,
    onClose: onClosePhotoModal,
  } = useDisclosure();

  const {
    isOpen: isOpenVideModal,
    onOpen: onOpenVideoModal,
    onClose: onCloseVideoModal,
  } = useDisclosure();

  const {
    isOpen: isOpenFindingModal,
    onOpen: onOpenFindingModal,
    onClose: onCloseFindingModal,
  } = useDisclosure();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [findingIndex, setFindingIndex] = useState(0);

  const handlePhotoClick = (index: number) => {
    setPhotoIndex(index);
    onOpenPhotoModal();
  };

  const handleVideoClick = (index: number) => {
    setVideoIndex(index);
    onOpenVideoModal();
  };

  const handleFindingClick = (index: number) => {
    setFindingIndex(index);
    onOpenFindingModal();
  };

  return (
    <>
      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <TreatmentTableOverview
          treatments={treatments}
          onPhotoClick={handlePhotoClick}
          onVideoClick={handleVideoClick}
          onFindingClick={handleFindingClick}
          deleteTreatment={deleteTreatment}
        />
      )}
      {treatments.length > 0 && (
        <>
          <PhotoViewModal
            photos={treatments[photoIndex].photos}
            isOpen={isOpenPhotoModal}
            onClose={onClosePhotoModal}
          />
          <VideoViewModal
            videos={treatments[videoIndex].videos}
            isOpen={isOpenVideModal}
            onClose={onCloseVideoModal}
          />
          <FindingViewModal
            findings={treatments[findingIndex].findings}
            isOpen={isOpenFindingModal}
            onClose={onCloseFindingModal}
          />
        </>
      )}
    </>
  );
};

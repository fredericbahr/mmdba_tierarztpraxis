import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { File, Image, MonitorPlay } from "phosphor-react";
import React from "react";
import { useState } from "react";

import { FindingViewModal } from "../../components/FindingViewModal/FindingViewModal";
import { PhotoViewModal } from "../../components/PhotoViewModal/PhotoViewModal";
import { VideoViewModal } from "../../components/VideoViewModal/VideoViewModal";
import { IMedicine } from "../../interfaces/medicineInterface";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  treatments: ITreatment[];
  isLoading: boolean;
}

export const TreatmentOverview = ({ treatments, isLoading }: IProps) => {
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

  const renderMedicines = (medicines: IMedicine[]) => {
    return (
      <List>
        {medicines.map((medicine) => {
          return <ListItem key={medicine.id}>{medicine.name}</ListItem>;
        })}
      </List>
    );
  };

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
        <TableContainer>
          {treatments.length > 0 && (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Datum</Th>
                  <Th>Diagnose</Th>
                  <Th>Notizen</Th>
                  <Th isNumeric>Kosten</Th>
                  <Th>Kunde</Th>
                  <Th>Tier</Th>
                  <Th>Medizin</Th>
                  <Th>Aktionen</Th>
                </Tr>
              </Thead>
              <Tbody>
                {treatments.map((treatment, idx) => (
                  <React.Fragment key={treatment.id}>
                    <Tr>
                      <Td>{format(new Date(treatment.date), "dd.MM.yyyy")}</Td>
                      <Td>{treatment.diagnosis}</Td>
                      <Td>{treatment.notes}</Td>
                      <Td isNumeric>{treatment.costs}</Td>
                      <Td>{treatment.customer.name}</Td>
                      <Td>{treatment.animal.name}</Td>
                      <Td>{renderMedicines(treatment.medicines)}</Td>
                      <Td>
                        <HStack>
                          <Tooltip label="Bilddokumentation" hasArrow>
                            <IconButton
                              variant="ghost"
                              colorScheme="gray"
                              icon={<Icon as={Image} />}
                              aria-label="Bilddokumentation"
                              onClick={() => handlePhotoClick(idx)}
                            />
                          </Tooltip>
                          <Tooltip label="Videodokumentation" hasArrow>
                            <IconButton
                              variant="ghost"
                              colorScheme="gray"
                              icon={<Icon as={MonitorPlay} />}
                              aria-label="Videodokumentation"
                              onClick={() => handleVideoClick(idx)}
                            />
                          </Tooltip>
                          <Tooltip label="Befunde" hasArrow>
                            <IconButton
                              variant="ghost"
                              colorScheme="gray"
                              icon={<Icon as={File} />}
                              aria-label="Befunde"
                              onClick={() => handleFindingClick(idx)}
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
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

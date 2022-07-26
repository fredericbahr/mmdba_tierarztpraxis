import {
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  Td,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import {
  File,
  Image,
  MonitorPlay,
  PencilSimple,
  TrashSimple,
} from "phosphor-react";
import React from "react";

import { useCustomToast } from "../../hooks/useCustomToast";
import { useFetch } from "../../hooks/useFetch";
import { IMedicine } from "../../interfaces/medicineInterface";
import { ITreatment } from "../../interfaces/treatmentInterface";
import { DeleteAlert } from "../DeleteAlert/DeleteAlert";
import { TreatmentEditModal } from "../TreatmentEditModal/TreatmentEditModal";

interface IProps {
  treatment: ITreatment;
  handlePhotoClick: () => void;
  handleVideoClick: () => void;
  handleFindingClick: () => void;
  deleteTreatment: (id: number) => void;
  setUpdatedTreatment: (treatment: ITreatment) => void;
}

export const TreatmentTableRow = ({
  treatment,
  handlePhotoClick,
  handleVideoClick,
  handleFindingClick,
  deleteTreatment,
  setUpdatedTreatment,
}: IProps) => {
  const { isLoading, error, deleteFetch } = useFetch();
  const { showErrorToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const renderMedicines = (medicines: IMedicine[]) => {
    return (
      <List>
        {medicines.map((medicine) => {
          return <ListItem key={medicine.id}>{medicine.name}</ListItem>;
        })}
      </List>
    );
  };

  // const renderSpecies = (species: ISpecies[]) => {
  //   return (
  //     <List>
  //       {species.map((specie) => {
  //         return <ListItem key={specie.id}>{specie.name}</ListItem>;
  //       })}
  //     </List>
  //   );
  // };

  const handleDelete = async () => {
    onClose();
    const { deletedTreatment } = await deleteFetch(
      `api/treatment/${treatment.id}`
    );

    if (!deletedTreatment || error) {
      return showErrorToast(
        "Fehler",
        "Behandlung konnte nicht gelöscht werden"
      );
    }

    deleteTreatment(treatment.id);
  };

  return (
    <>
      <Tr
        _hover={{
          backgroundColor: "gray.100",
        }}
      >
        <Td>{format(new Date(treatment.date), "dd.MM.yyyy")}</Td>
        <Td>{treatment.diagnosis}</Td>
        <Td>{treatment.notes}</Td>
        <Td isNumeric>{treatment.costs}</Td>
        <Td>{treatment.customer?.name || "---"}</Td>
        <Td>{treatment.animal?.name || "---"}</Td>
        <Td>{treatment.animal?.race?.name || "---"}</Td>
        <Td>{treatment.animal?.race?.species?.name || "---"}</Td>
        <Td>{renderMedicines(treatment.medicines)}</Td>
        <Td>
          <HStack>
            {treatment.photos.length > 0 && (
              <Tooltip label="Bilddokumentation" hasArrow>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  icon={<Icon as={Image} />}
                  aria-label="Bilddokumentation"
                  onClick={handlePhotoClick}
                />
              </Tooltip>
            )}
            {treatment.videos.length > 0 && (
              <Tooltip label="Videodokumentation" hasArrow>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  icon={<Icon as={MonitorPlay} />}
                  aria-label="Videodokumentation"
                  onClick={handleVideoClick}
                />
              </Tooltip>
            )}
            {treatment.findings.length > 0 && (
              <Tooltip label="Befunde" hasArrow>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  icon={<Icon as={File} />}
                  aria-label="Befunde"
                  onClick={handleFindingClick}
                />
              </Tooltip>
            )}
            <Tooltip label="Behandlung bearbeiten" hasArrow>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                icon={<Icon as={PencilSimple} />}
                aria-label="Löschen"
                isLoading={isLoading}
                onClick={onOpenUpdate}
              />
            </Tooltip>
            <Tooltip label="Behandlung löschen" hasArrow>
              <IconButton
                variant="ghost"
                colorScheme="red"
                icon={<Icon as={TrashSimple} />}
                aria-label="Löschen"
                isLoading={isLoading}
                onClick={onOpen}
              />
            </Tooltip>
          </HStack>
        </Td>
      </Tr>
      <DeleteAlert
        heading="Behandlung löschen?"
        body="Wollen Sie die Behandlung wirklich löschen?"
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        onDelete={() => handleDelete()}
      />
      <TreatmentEditModal
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        treatment={{ ...treatment }}
        setUpdatedTreatment={setUpdatedTreatment}
      />
    </>
  );
};

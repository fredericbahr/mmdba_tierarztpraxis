import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

import { ITreatment } from "../../interfaces/treatmentInterface";
import { TreatmentTableRow } from "./TreatmentTableRow";

interface IProps {
  treatments: ITreatment[];
  onPhotoClick: (index: number) => void;
  onVideoClick: (index: number) => void;
  onFindingClick: (index: number) => void;
  deleteTreatment: (id: number) => void;
}

export const TreatmentTableOverview = ({
  treatments,
  onPhotoClick,
  onVideoClick,
  onFindingClick,
  deleteTreatment,
}: IProps) => {
  const handlePhotoClick = (index: number) => {
    onPhotoClick(index);
  };

  const handleVideoClick = (index: number) => {
    onVideoClick(index);
  };

  const handleFindingClick = (index: number) => {
    onFindingClick(index);
  };

  return (
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
              <Th>Spezies</Th>
              <Th>Rasse</Th>
              <Th>Medizin</Th>
              <Th>Aktionen</Th>
            </Tr>
          </Thead>
          <Tbody>
            {treatments.map((treatment, idx) => (
              <TreatmentTableRow
                key={treatment.id}
                treatment={treatment}
                handlePhotoClick={() => handlePhotoClick(idx)}
                handleVideoClick={() => handleVideoClick(idx)}
                handleFindingClick={() => handleFindingClick(idx)}
                deleteTreatment={deleteTreatment}
              />
            ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

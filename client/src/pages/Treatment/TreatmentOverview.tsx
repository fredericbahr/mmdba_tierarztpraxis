import {
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
} from "@chakra-ui/react";
import { format } from "date-fns";
import { File, Image, MonitorPlay } from "phosphor-react";
import React from "react";

import { IMedicine } from "../../interfaces/medicineInterface";
import { ITreatment } from "../../interfaces/treatmentInterface";

interface IProps {
  treatments: ITreatment[];
  isLoading: boolean;
}

export const TreatmentOverview = ({ treatments, isLoading }: IProps) => {
  const renderMedicines = (medicines: IMedicine[]) => {
    return (
      <List>
        {medicines.map((medicine) => {
          return <ListItem key={medicine.id}>{medicine.name}</ListItem>;
        })}
      </List>
    );
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
                {treatments.map((treatment) => (
                  <>
                    <Tr key={treatment.id}>
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
                            />
                          </Tooltip>
                          <Tooltip label="Videodokumentation" hasArrow>
                            <IconButton
                              variant="ghost"
                              colorScheme="gray"
                              icon={<Icon as={MonitorPlay} />}
                              aria-label="Videodokumentation"
                            />
                          </Tooltip>
                          <Tooltip label="Befunde" hasArrow>
                            <IconButton
                              variant="ghost"
                              colorScheme="gray"
                              icon={<Icon as={File} />}
                              aria-label="Befunde"
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      )}
    </>
  );
};

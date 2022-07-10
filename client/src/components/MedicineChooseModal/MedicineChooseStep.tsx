import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import React from "react";

import { IMedicine } from "../../interfaces/medicineInterface";
import { ISelectOptions } from "../../interfaces/selectInterface";
import { MedicineCard } from "../MedicineCard/MedicineCard";
import { Pagination } from "../Pagination/Pagination";

interface IProps {
  medicines: IMedicine[];
  setSelectedMedicine: (medicine: IMedicine | null) => void;
  onClose: () => void;
}

export const MedicineChooseStep = ({
  medicines,
  setSelectedMedicine,
  onClose,
}: IProps) => {
  const [page, setPage] = React.useState(1);
  const showAmount = 6;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const handleMedicineClick = (index: number) => {
    setSelectedMedicine(medicines[index]);
    onClose();
  };

  return (
    <VStack spacing={6}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
        {medicines
          .slice((page - 1) * showAmount, (page - 1) * showAmount + showAmount)
          .map((medicine: IMedicine, index: number) => (
            <GridItem
              key={index}
              onClick={() => handleMedicineClick(index)}
              cursor="pointer"
            >
              <MedicineCard medicine={medicine} />
            </GridItem>
          ))}
      </Grid>
      <Pagination
        count={Math.ceil(medicines.length / showAmount)}
        currentPage={page}
        handleClick={handlePagination}
      />
    </VStack>
  );
};

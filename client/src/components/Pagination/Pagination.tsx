import { HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import React from "react";

import { PaginationItem } from "./PaginationItem";

interface IProps {
  count: number;
  currentPage: number;
  handleClick: (page: number) => void;
}

export const Pagination = ({ count, currentPage, handleClick }: IProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < count) {
      handleClick(currentPage + 1);
    }
  };

  return (
    <HStack>
      <IconButton
        aria-label="Previous Page"
        icon={<Icon as={CaretLeft} />}
        onClick={handlePrevious}
        variant="ghost"
        disabled={currentPage === 1}
      />
      <PaginationItem
        isActive={currentPage === 1}
        onClick={() => handleClick(1)}
      >
        1
      </PaginationItem>

      {count === 3 && currentPage === 1 && (
        <PaginationItem isActive={false} onClick={() => handleClick(2)}>
          {2}
        </PaginationItem>
      )}

      {count > 3 && currentPage < 3 && (
        <>
          <PaginationItem
            isActive={currentPage === 2}
            onClick={() => handleClick(2)}
          >
            {2}
          </PaginationItem>
          {count > 3 && currentPage !== 1 && (
            <PaginationItem
              isActive={currentPage === 3}
              onClick={() => handleClick(3)}
            >
              3
            </PaginationItem>
          )}
          {count > 3 && <Text>...</Text>}
        </>
      )}

      {count > 3 && currentPage - 1 > 1 && currentPage + 1 < count && (
        <>
          {currentPage - 1 > 2 && <Text>...</Text>}
          {Array.from({ length: 3 }, (_, idx) => (
            <PaginationItem
              key={idx}
              isActive={currentPage === currentPage - 1 + idx}
              onClick={() => handleClick(currentPage - 1 + idx)}
            >
              {currentPage - 1 + idx}
            </PaginationItem>
          ))}
          {currentPage + 1 < count - 1 && <Text>...</Text>}
        </>
      )}

      {currentPage >= count - 1 && (
        <>
          {count > 3 && <Text>...</Text>}
          {count > 3 && (
            <PaginationItem
              isActive={currentPage === count - 2}
              onClick={() => handleClick(count - 2)}
            >
              {count - 2}
            </PaginationItem>
          )}
          <PaginationItem
            isActive={currentPage === count - 1}
            onClick={() => handleClick(count - 1)}
          >
            {count - 1}
          </PaginationItem>
        </>
      )}

      {count > 1 && (
        <PaginationItem
          isActive={currentPage === count}
          onClick={() => handleClick(count)}
        >
          {count}
        </PaginationItem>
      )}
      <IconButton
        aria-label="Next Page"
        icon={<Icon as={CaretRight} />}
        onClick={handleNext}
        variant="ghost"
        disabled={currentPage === count}
      />
    </HStack>
  );
};

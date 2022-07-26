import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  HStack,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { TrashSimple, X } from "phosphor-react";
import React, { useRef } from "react";

interface IProps {
  heading: string;
  body: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteAlert = ({
  heading,
  body,
  isOpen,
  isLoading,
  onClose,
  onDelete,
}: IProps) => {
  const cancelRef: any = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <HStack spacing={4}>
              <Tooltip label="Abbrechen" hasArrow>
                <IconButton
                  icon={<Icon as={X} />}
                  aria-label="Abbrechen"
                  colorScheme="gray"
                  variant="ghost"
                  isLoading={isLoading}
                  onClick={onClose}
                />
              </Tooltip>
              <Tooltip label="Löschen" hasArrow>
                <IconButton
                  icon={<Icon as={TrashSimple} />}
                  aria-label="Löschen"
                  colorScheme="red"
                  isLoading={isLoading}
                  onClick={onDelete}
                />
              </Tooltip>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from '@chakra-ui/react';
  
  interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    type: string;
  }
  
  export const ContentModal: React.FC<ContentModalProps> = ({
    isOpen,
    onClose,
    content,
    type,
  }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{content}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Zone } from '../../types/zone'

interface ModalProps {
  zone: Zone
  onConfirmed: (id: number) => void
}

const DeleteZoneModal = ({ zone, onConfirmed }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function onConfirmClicked(id: number) {
    onConfirmed(id)
    onClose()
  }

  return (
    <>
      <DeleteIcon ml={4} color="red.500" _hover={{cursor: 'pointer'}} onClick={onOpen}></DeleteIcon>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you wish to delete {zone.name}?
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
            <Button variant='ghost' onClick={() => onConfirmClicked(zone.id as number)}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteZoneModal

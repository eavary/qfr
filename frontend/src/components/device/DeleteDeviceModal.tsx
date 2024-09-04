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
import type { Device } from '../../types/device'

interface ModalProps {
  device: Device
  onConfirmed: (id: number) => void
}

const DeleteDeviceModal = ({ device, onConfirmed }: ModalProps) => {
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
          <ModalHeader>Delete Device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you wish to delete {device.name}?
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
            <Button variant='ghost' onClick={() => onConfirmClicked(device.id as number)}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteDeviceModal

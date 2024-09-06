import { useRef } from 'react'
import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import type { Device } from '../../types/device'
import QFRModal from '../QFRModal'

interface ModalProps {
  device: Device
  onConfirmed: (id: number) => void
}

const DeleteDeviceButton = ({ device, onConfirmed }: ModalProps) => {
  const modal = useRef()

  const onConfirmClicked = (id: number) => {
    onConfirmed(id)
    handleClose()
  }

  const handleClose = () => {
    modal.current.close()
  }

  const handleOpen = () => {
    modal.current.open()
  }

  return (
    <>
      <DeleteIcon ml={4} color="red.500" _hover={{cursor: 'pointer'}} onClick={handleOpen}></DeleteIcon>

      <QFRModal
        ref={modal}
        confirmText='Submit'
        title="Delete Device"
        cancelText="Cancel"
        onModalClose={handleClose}
        onConfirmed={() => onConfirmClicked(device.id as number)}
      >
        Are you sure you wish to delete {device.name}?
      </QFRModal>
    </>
  )
}

export default DeleteDeviceButton

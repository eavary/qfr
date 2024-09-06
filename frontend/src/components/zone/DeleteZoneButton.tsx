import { useRef } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'

import { Zone } from '../../types/zone'
import QFRModal from '../QFRModal'

interface ModalProps {
  zone: Zone
  onConfirmed: (id: number) => void
}

const DeleteZoneButton = ({ zone, onConfirmed }: ModalProps) => {
  const modal = useRef()

  function onConfirmClicked(id: number) {
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
      <DeleteIcon ml={4} color="red.500" _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal
        ref={modal}
        confirmText='Submit'
        title="Delete Device"
        cancelText="Cancel"
        onModalClose={handleClose}
        onConfirmed={() => onConfirmClicked(zone.id as number)}
      >
        Are you sure you wish to delete {zone.name}?
      </QFRModal>
    </>
  )
}

export default DeleteZoneButton

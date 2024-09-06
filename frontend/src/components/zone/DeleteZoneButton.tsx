import { useRef } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/qfrmodal'
import type { Zone } from '../../types/zone'
import QFRModal from '../QFRModal'

interface IProps {
  zone: Zone
  onConfirmed: (id: number) => void
}

const DeleteZoneButton = ({ zone, onConfirmed }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

  function onConfirmClicked(id: number) {
    onConfirmed(id)
    handleClose()
  }

  const handleClose = () => {
    modal.current?.close()
  }

  const handleOpen = () => {
    modal.current?.open()
  }

  return (
    <>
      <DeleteIcon ml={4} color="red.500" _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal
        ref={modal}
        title="Delete Device"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={() => onConfirmClicked(zone.id as number)}
        onModalClose={handleClose}
      >
        Are you sure you wish to delete {zone.name}?
      </QFRModal>
    </>
  )
}

export default DeleteZoneButton

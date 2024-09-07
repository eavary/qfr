import { useRef } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/QFRModalType'
import type { Device } from '../../types/DeviceType'
import QFRModal from '../QFRModal'

interface IProps {
  device: Device
  onConfirmed: (id: number) => void
}

const DeleteDeviceButton = ({ device, onConfirmed }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

  const onConfirmClicked = (id: number) => {
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
        onConfirmed={() => onConfirmClicked(device.id as number)}
        onModalClose={handleClose}
      >
        Are you sure you wish to delete {device.name}?
      </QFRModal>
    </>
  )
}

export default DeleteDeviceButton

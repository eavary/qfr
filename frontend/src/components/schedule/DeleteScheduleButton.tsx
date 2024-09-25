import { useRef } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/QFRModalType'
import { Schedule } from '../../types/ScheduleType'
import QFRModal from '../QFRModal'

interface IProps {
  schedule: Schedule
  onConfirmed: (id: number) => void
}

const DeleteScheduleButton = ({ schedule, onConfirmed }: IProps) => {
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
      <DeleteIcon color="red.500" _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal
        ref={modal}
        title="Delete Device"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={() => onConfirmClicked(schedule.id as number)}
        onModalClose={handleClose}
      >
        Are you sure you wish to delete this schedule?
      </QFRModal>
    </>
  )
}

export default DeleteScheduleButton

import { useEffect, useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/QFRModalType'
import type { Schedule } from '../../types/ScheduleType'
import QFRModal from '../QFRModal'

interface IProps {
  deviceId: number
  schedule: Schedule
  onSubmitted: (schedule: Schedule) => void
}

const EditScheduleButton = ({ deviceId, schedule, onSubmitted }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

  const [zoneId, setZoneId] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState('')
  const [duration, setDuration] = useState('')
  const [startTime, setStartTime] = useState('')

    const resetForm = () => {
    setDayOfWeek('')
    setDuration('')
    setStartTime('')
    setZoneId('')
  }

  useEffect(() => {
    setDayOfWeek(schedule.day_of_week)
    setDuration(schedule.duration)
    setStartTime(schedule.start_time)
    setZoneId(schedule.zone_id)
  }, [])

  const processSubmit = (event: any) => {    
    event.preventDefault()

    if (dayOfWeek.length > 0 && duration.length > 0 && startTime.length > 0 && zoneId.length > 0) {
      onSubmitted({
        device_id: deviceId,
        zone_id: zoneId,
        day_of_week: dayOfWeek,
        start_time: startTime,
        duration: duration
      })
      handleClose()
    }
  }

  const handleClose = () => {
    resetForm()
    modal.current?.close()
  }

  const handleOpen = () => {
    modal.current?.open()
  }

  return (
    <>
      <EditIcon _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal
        ref={modal}
        title={'Edit Schedule'}
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={processSubmit}
        onModalClose={handleClose}
      >
        Schedule Form
      </QFRModal>
    </>
  )
}

export default EditScheduleButton

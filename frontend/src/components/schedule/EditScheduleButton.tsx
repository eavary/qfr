import { useEffect, useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/QFRModalType'
import type { Schedule } from '../../types/ScheduleType'
import type { Zone } from '../../types/ZoneType'

import { DAY_OF_WEEK } from '../../constants'

import QFRModal from '../QFRModal'

interface IProps {
  deviceId: number
  schedule: Schedule
  zones: Zone[]
  onSubmitted: (schedule: Schedule) => void
}

const EditScheduleButton = ({ deviceId, schedule, zones, onSubmitted }: IProps) => {
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

    if (dayOfWeek && duration && startTime && zoneId) {
      onSubmitted({
        id: schedule.id,
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
        <form id="edit-schedule-form" onSubmit={processSubmit}>
          <FormControl my={2}>
            <FormLabel>Select Zone</FormLabel>
            <Select 
              placeholder='Select Zone' 
              onChange={e => setZoneId(e.currentTarget.value)}
              value={zoneId}
            >
              { zones.map(zone =>
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              )}
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Day of Week</FormLabel>
            <Select
              placeholder="Day of Week"
              onChange={e => setDayOfWeek(e.currentTarget.value)}
              value={dayOfWeek}
            >
              { DAY_OF_WEEK.map(d => 
                <option value={d.value} key={d.id}>{d.name}</option>
              )}
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Start Time</FormLabel>
            <Input 
              placeholder="Start Time"
              value={startTime}
              onChange={e => setStartTime(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Duration</FormLabel>
            <Input 
              placeholder="Duration"
              value={duration}
              onChange={e => setDuration(e.currentTarget.value)}
            />
          </FormControl>
        </form>
      </QFRModal>
    </>
  )
}

export default EditScheduleButton

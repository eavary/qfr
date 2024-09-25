import { useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'

import type { QFRModalRef } from '../../types/QFRModalType'
import type { Schedule } from '../../types/ScheduleType'
import type { Zone } from '../../types/ZoneType'

import { DAY_OF_WEEK } from '../../constants'

import QFRModal from '../QFRModal'
import { AddIcon } from '@chakra-ui/icons'

interface IProps {
  deviceId: number,
  zones: Zone[],
  onSubmitted: (schedule: Schedule) => void
}

const AddScheduleButton = ({ deviceId, zones, onSubmitted }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

  const [dayOfWeek, setDayOfWeek] = useState('')
  const [duration, setDuration] = useState('')
  const [startTime, setStartTime] = useState('')
  const [zoneId, setZoneId] = useState('')

  const resetForm = () => {
    setDayOfWeek('')
    setDuration('')
    setStartTime('')
    setZoneId('')
  }

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
      <AddIcon _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal 
        ref={modal}
        title="Add Schedule"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={processSubmit}
        onModalClose={handleClose}
      >
        <form id="add-zone-form" onSubmit={processSubmit}>
          <FormControl my={2}>
            <FormLabel>Select Zone</FormLabel>
            <Select 
              placeholder='Select Zone' 
              onChange={e => setZoneId(e.currentTarget.value)}
            >
              { zones.map(zone =>
                <option value={zone.id} key={zone.id}>{zone.name}</option>
              )}
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Day of Week</FormLabel>
            <Select
              placeholder="Day of Week"
              onChange={e => setDayOfWeek(e.currentTarget.value)}
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

export default AddScheduleButton

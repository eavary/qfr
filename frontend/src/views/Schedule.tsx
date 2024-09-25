import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { Device } from '../types/DeviceType'
import type { Schedule } from '../types/ScheduleType'
import type { Zone } from '../types/ZoneType'

import AnimatedLayout from '../layouts/AnimatedLayout'
import DeviceAPIService from '../services/DeviceAPIService'
import ScheduleAPIService from '../services/ScheduleAPIService'
import ZoneAPIService from '../services/ZoneAPIService'

import ScheduleList from '../components/schedule/ScheduleList'

const Schedule = () => {
  const [zones, setZones] = useState([] as Zone[])
  const [scheduleItems, setScheduleItems] = useState([] as Schedule[])
  const [selectedDevice, setSelectedDevice] = useState({} as Device)

  const { deviceId } = useParams()

  useEffect(() => {
    if (deviceId) {
      fetchDevice(deviceId)
      fetchZones(deviceId)
      fetchScheduleItems(deviceId)
    }
  }, [])
  const fetchDevice = async (deviceId: string) => {
    const device = await DeviceAPIService.getDevice(deviceId)
    setSelectedDevice(device[0])
  }

  const fetchZones = async (deviceId: string) => {
    const zones = await ZoneAPIService.getZonesForDevice(deviceId)
    setZones(zones)
  }

  const fetchScheduleItems = async (deviceId: string) => {
    const scheduleItems = await ScheduleAPIService.getDeviceSchedules(deviceId)
    setScheduleItems(scheduleItems)
  }

  const handleAddSchedule = async(schedule: any) => {
    const newId = await ScheduleAPIService.addSchedule(schedule)
  }

  const handleEditSchedule = async() => {
  }

  const handleDeleteSchedule = async() => {
  }

  return (
    <AnimatedLayout>
      <ScheduleList
        device={selectedDevice}
        zones={zones}
        scheduleItems={scheduleItems}
        onAddSchedule={handleAddSchedule}
        onEditSchedule={handleEditSchedule}
        onDeleteSchedule={handleDeleteSchedule}
      />
    </AnimatedLayout>
  )
}

export default Schedule

import { useEffect, useState } from 'react'

import DeviceAPIService from '../services/DeviceAPIService'

import type { Device } from '../types/DeviceType'

import DeviceList from '../components/device/DeviceList'
import AnimatedLayout from '../layouts/AnimatedLayout'

const Devices = () => {
  const [devices, setDevices] = useState([] as Device[])

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    const devices = await DeviceAPIService.getDevices()
    setDevices(devices)
  }

  const handleAddDevice = async(device: Device) => {
    const newId = await DeviceAPIService.addDevice(device)
    setDevices(prevDevices => {
      let devices = [...prevDevices]
      devices.push({ id: newId, ...device})
      return devices
    })
  }

  const handleDeleteDevice = async(deviceId: number) => {
    await DeviceAPIService.deleteDevice(deviceId)
    setDevices(prevDevices => {
      let devices = [...prevDevices]
      const idx = devices.findIndex(d => d.id === deviceId)
      devices.splice(idx, 1)

      return devices
    })
  }

  const handleEditDevice = async(deviceData: Device) => {
    await DeviceAPIService.editDevice(deviceData)
    setDevices(prevDevices => {
      let devices = [...prevDevices]
      const idx = devices.findIndex(d => d.id === deviceData.id)
      devices[idx] = {...deviceData}
      return devices
    })
  }

  return (
    <AnimatedLayout>
      <DeviceList 
        devices={devices}
        onAddDevice={handleAddDevice}
        onDeleteDevice={handleDeleteDevice}
        onEditDevice={handleEditDevice}
      />
    </AnimatedLayout>
  )
}

export default Devices

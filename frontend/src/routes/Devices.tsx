import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DeviceAPIService from '../services/DeviceAPIService'

import type { Device } from '../types/DeviceType'

import DeviceList from '../components/device/DeviceList'

const Devices = () => {
  const [devicesState, setDevicesState] = useState({
    selectedDeviceId: 0,
    devices: [] as Device[]
  })

  const navigate = useNavigate()

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    const devices = await DeviceAPIService.getDevices()
    setDevicesState(prevState => {
      return {
        ...prevState,
        selectedDeviceId: 0,
        devices: devices
      }
    })
  }

  const handleAddDevice = async(device: Device) => {
    const newId = await DeviceAPIService.addDevice(device)
    setDevicesState(prevState => {
      let devices = [...prevState.devices]
      devices.push({ id: newId, ...device})
      return {
        devices,
        selectedDeviceId: newId
      }
    })
  }

  const handleDeleteDevice = async(deviceId: number) => {
    await DeviceAPIService.deleteDevice(deviceId)
    setDevicesState(prevState => {
      let devices = [...prevState.devices]
      const idx = devices.findIndex(d => d.id === deviceId)
      devices.splice(idx, 1)

      return {
        devices,
        selectedDeviceId: 0
      }
    })
  }

  const handleEditDevice = async(deviceData: Device) => {
    await DeviceAPIService.editDevice(deviceData)
    setDevicesState(prevState => {
      let devices = [...prevState.devices]
      const idx = devices.findIndex(d => d.id === deviceData.id)
      devices[idx] = {...deviceData}
      return {
        devices,
        selectedDeviceId: Number(deviceData.id),
      }
    })
  }

  function handleDeviceSelected(deviceId: number) {
    // setDevicesState(prevState => {
    //   return {
    //     ...prevState,
    //     selectedDeviceId: deviceId,
    //   }
    // })

    navigate(`/devices/${deviceId}`)

    // fetchZones(id)
  }

  return (
    <DeviceList 
      devices={devicesState.devices}
      onAddDevice={handleAddDevice}
      onDeleteDevice={handleDeleteDevice}
      onEditDevice={handleEditDevice}
      onSelectDevice={handleDeviceSelected}
    />
  )
}

export default Devices

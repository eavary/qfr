import { useState, useEffect } from 'react'
import axios from "axios"

import { Box, Heading } from '@chakra-ui/react'

import type { Device } from './types/device'
import type { Zone } from './types/zone'

import DeviceList from './components/device/DeviceList'
import MqttTest from './components/MqttTest'
import ZoneList from './components/zone/ZoneList'

import './App.css'

const URL = "http://localhost:3000/api"

function App() {
  const [devicesState, setDevicesState] = useState({
    selectedDeviceId: 0,
    devices: [] as Device[]
  })
  const [zones, setZones] = useState([] as Zone[])

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${URL}/devices`)
      setDevicesState(prevState => {
        return {
          ...prevState,
          selectedDeviceId: 0,
          devices: response.data.result
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchZones = async (id: number) => {
    try {
      const response = await axios.get(`${URL}/devices/${id}/zones`)
      setZones(response.data.result)
    } catch (error) {
      console.error('Error fetching zones:', error)
    }
  }

  const handleAddDevice = async(device: Device) => {
    try {
      const response = await axios.post(`${URL}/devices/add`, device)
      const newId = response.data.result
      setDevicesState(prevState => {
        let devices = [...prevState.devices]
        devices.push({ id: newId, ...device})
        return {
          devices,
          selectedDeviceId: newId
        }
      })
    } catch (error) {
      console.error('Error adding device', error)
    }
  }

  const handleDeleteDevice = async(id: number) => {
    try {
      await axios.delete(`${URL}/device/${id}`)
      setDevicesState(prevState => {
        let devices = [...prevState.devices]
        const idx = devices.findIndex(d => d.id === id)
        devices.splice(idx, 1)

        return {
          devices,
          selectedDeviceId: 0
        }
      })
    } catch (error) {
      console.error(`Error deleting device ${id}`, error)
    }
  }

  const handleEditDevice = async(deviceData: Device) => {
    try {
      await axios.put(`${URL}/devices/${deviceData.id}`, deviceData)
      setDevicesState(prevState => {
        let devices = [...prevState.devices]
        const idx = devices.findIndex(d => d.id === deviceData.id)
        devices[idx] = {...deviceData}
        return {
          devices,
          selectedDeviceId: Number(deviceData.id),
        }
      })
    } catch (error) {
      console.error(`Error updating device ${deviceData.id}`, error)
    }
  }

  function handleDeviceSelected(id: number) {
    setDevicesState(prevState => {
      return {
        ...prevState,
        selectedDeviceId: id,
      }
    })

    fetchZones(id)
  }

  function handleAddZone() {
    console.log('handleAddZone...')
  }

  function handleDeleteZone(id: number) {
    console.log('handleDeleteZone...', id)
  }
  
  function handleEditZone(id: number) {
    console.log('handleEditZone...', id)
  }
  const selectedDevice = 
          devicesState.devices.find(device => device.id === devicesState.selectedDeviceId) || 
          { id: 0, name: '', ip_address: '', hostname: '', num_zones: 0}
  
  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          SprinklerZ
        </Heading>

        <DeviceList 
          devices={devicesState.devices}
          onAddDevice={handleAddDevice}
          onDeleteDevice={handleDeleteDevice}
          onEditDevice={handleEditDevice}
          onSelectDevice={handleDeviceSelected}
        />

        {devicesState.selectedDeviceId > 0
          ? <ZoneList 
              deviceName={selectedDevice.name}
              zones={zones} 
              onAddZone={handleAddZone}
              onDeleteZone={handleDeleteZone}
              onEditZone={handleEditZone}
            />
          : null 
        }

        {/* <MqttTest /> */}
      </Box>
    </>
  )
}

export default App

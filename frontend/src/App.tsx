import { useState, useEffect } from 'react'
import axios from "axios"

import { Box, Button, Card, Heading } from '@chakra-ui/react'

import type { Device } from './types/device'

import DeviceList from './components/device/DeviceList'
import DeviceAddEdit from './components/device/DeviceAddEdit'
import MqttTest from './components/MqttTest'

import './App.css'

const URL = "http://localhost:3000"

function App() {
  const [devicesState, setDevicesState] = useState({
    selectedDeviceId: 0,
    devices: [] as Device[]
  })
  const [isAddDevice, setIsAddDevice] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/devices")
      setDevicesState(prevState => {
        return {
          ...prevState,
          selectedDeviceId: 0,
          devices: response.data
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleAddDevice() {
    setIsAddDevice(true)
  }

  function handleEditDevice(id: number) {
    setDevicesState(prevState => {
      setIsAddDevice(true)
      return {
        ...prevState,
        selectedDeviceId: id,
      }
    })
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

        {isAddDevice 
          ? <DeviceAddEdit
              device={selectedDevice}
            />
          : 
            <DeviceList 
              devices={devicesState.devices}
              onAddDevice={handleAddDevice}
              onEditDevice={handleEditDevice}
            />
        }

        <MqttTest />
      </Box>
    </>
  )
}

export default App

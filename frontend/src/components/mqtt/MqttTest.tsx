import { useState } from 'react'
import axios from "axios"

import { Button, Card, CardBody, CardHeader } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

const URL = "http://localhost:3000/api"

export default function MqttTest() {

  const [isArmDevice, setIsArmDevice] = useState(false)

  const toggleArmDevice = async() => {
    if (isArmDevice) {
      try {
        await axios.get(URL + "/mqtt/disarm")
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        await axios.get(URL + "/mqtt/arm")
      } catch (error) {
        console.error(error)
      }

    }
    setIsArmDevice(prevValue => !prevValue)
  }

  const handleConnect = async() => {
    try {
      await axios.get(URL + "/mqtt/connect")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Heading size='md'>MQTT Test</Heading>
      </CardHeader>
      <CardBody pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
        <Button colorScheme='teal' onClick={handleConnect} my={6} mr={3}>
          Test Connect
        </Button>
        <Button colorScheme='teal' onClick={toggleArmDevice} my={6}>
          {isArmDevice ? 'Disarm' : 'Arm'}
        </Button>
      </CardBody>
    </Card>
  )
}

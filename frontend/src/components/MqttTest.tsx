import { useState, useEffect } from 'react'

import { Button, Card, CardBody, CardHeader, Flex, IconButton } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

export default function MqttTest() {

  const [isArmDevice, setIsArmDevice] = useState(false)

  function toggleArmDevice() {
    setIsArmDevice(prevValue => !prevValue)
  }

  return (
    <Card mt={16}>
      <CardHeader>
        <Heading size='md'>MQTT Test</Heading>
      </CardHeader>
      <CardBody pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
        <Button colorScheme='teal' onClick={toggleArmDevice} my={6}>
          {isArmDevice ? 'Disarm' : 'Arm'}
        </Button>
      </CardBody>
    </Card>
  )
}

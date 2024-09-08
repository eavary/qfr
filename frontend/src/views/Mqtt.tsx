import {
  Card, 
  CardBody, 
  CardHeader,
  Heading
} from '@chakra-ui/react'

import AnimatedLayout from '../layouts/AnimatedLayout'
import MQttTest from '../components/mqtt/MqttTest'

const Mqtt = () => {
  return (
    <AnimatedLayout>
      <Card mt={6} minWidth="600">
        <CardHeader>
          <Heading size='md'>MQTT</Heading>
        </CardHeader>
        <CardBody>
          <MQttTest />
        </CardBody>
      </Card>
    </AnimatedLayout>
  )
}

export default Mqtt

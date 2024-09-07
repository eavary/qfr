import {
  Card, 
  CardBody, 
  CardHeader,
  Heading
} from '@chakra-ui/react'
import MQttTest from '../components/mqtt/MqttTest'

const Mqtt = () => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Heading size='md'>MQTT</Heading>
      </CardHeader>
      <CardBody>
        <MQttTest />
      </CardBody>
    </Card>
  )
}

export default Mqtt

import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import AnimatedLayout from '../layouts/AnimatedLayout'

const Schedule = () => {
  return (
    <AnimatedLayout>
      <Card mt={16} minWidth="600">
        <CardHeader>
          <Heading size='md'>Schedule</Heading>
        </CardHeader>
        <CardBody pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
          The magical scheduler goes here
        </CardBody>
      </Card>
    </AnimatedLayout>
  )
}

export default Schedule

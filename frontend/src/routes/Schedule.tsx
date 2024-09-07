import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'

const Schedule = () => {
  return (
    <Card mt={16} minWidth="600">
      <CardHeader>
        <Heading size='md'>Schedule</Heading>
      </CardHeader>
      <CardBody pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
        The magical scheduler goes here
      </CardBody>
    </Card>
  )
}

export default Schedule

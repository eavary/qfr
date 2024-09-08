import {
  Card, 
  CardBody, 
  CardHeader,
  Heading
} from '@chakra-ui/react'
import AnimatedLayout from '../layouts/AnimatedLayout'

const NotFound = () => {
  return (
    <AnimatedLayout>
      <Card mt={6} minWidth="600">
        <CardHeader>
          <Heading size='md'>Not Found</Heading>
        </CardHeader>
        <CardBody>
          This is most likely a routing error, but we're open minded... <br />
          you could have gotten here any number of ways.
        </CardBody>
      </Card>
    </AnimatedLayout>
  )
}

export default NotFound

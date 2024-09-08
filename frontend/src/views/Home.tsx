import {
  Card, 
  CardBody, 
  CardHeader,
  Heading
} from '@chakra-ui/react'
import AnimatedLayout from '../layouts/AnimatedLayout'

const Home = () => {
  return (
    <AnimatedLayout>
      <Card mt={6} minWidth="600">
        <CardHeader>
          <Heading size='md'>Aquifer</Heading>
        </CardHeader>
        <CardBody>
          An application for managing your sprinkler system
        </CardBody>
      </Card>
    </AnimatedLayout>
  )
}

export default Home

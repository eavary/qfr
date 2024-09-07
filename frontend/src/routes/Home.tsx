import {
  Card, 
  CardBody, 
  CardHeader,
  Heading
} from '@chakra-ui/react'

const Home = () => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Heading size='md'>Aquifer</Heading>
      </CardHeader>
      <CardBody>
        An application for managing your sprinkler system
      </CardBody>
    </Card>
  )
}

export default Home

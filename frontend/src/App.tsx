import { useState, useEffect, SetStateAction } from 'react'
import axios from "axios"

import { Box, Heading, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Card, CardHeader } from '@chakra-ui/react'

import './App.css'

const URL = "http://localhost:3000"

function App() {
  const [data, setData] = useState([{
    id: 1,
    name: 'eric'
  }])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/user")
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value)
  };

  const postData = async () => {
    try {
      const response = await axios.post(URL + "/user", { data: inputValue })
      console.log(response.data)
      fetchData(); // Fetch data again after posting
    } catch (error) {
      console.error(error)
    }
  };

  // const dbinit = async () => {
  //   try {
  //     const response = await axios.post(URL + "/dbinit")
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  // const tbinit = async () => {
  //   try {
  //     const response = await axios.post(URL + "/tbinit")
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  interface User {
    id: number,
    name: string,
  }

  return (
    <>
      {/* user */}
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Test User Submit
        </Heading>
        <Text color={'gray.500'} textAlign="left">
          Enter a name to add to the database
        </Text>
        <Input name="input-parameter" onChange={handleChange} />
        <br />
        <br />
        <Button colorScheme='teal' onClick={postData}>Submit</Button> <br />

        <Card mt={10}>
          <CardHeader>
            <Heading size='md'>User List</Heading>
          </CardHeader>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((user: User) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  )
}

export default App

import {
  Box,
  Card, 
  CardHeader, 
  Flex
} from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { MdCalendarMonth, MdOutlineAccountTree } from 'react-icons/md'

import type { Device } from '../../types/DeviceType'
import AddDeviceButton from './AddDeviceButton'
import DeleteDeviceButton from './DeleteDeviceButton'
import EditDeviceButton from './EditDeviceButton'

interface IProps {
  devices: Device[]
  onAddDevice: (device: Device) => void
  onDeleteDevice: (id: number) => void
  onEditDevice: (device: Device) => void
}

const DeviceList = ({devices, onAddDevice, onDeleteDevice, onEditDevice}: IProps) => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md'>Devices</Heading>
          <AddDeviceButton onSubmitted={onAddDevice} />
        </Flex>
      </CardHeader>
      <TableContainer>
        {devices.length ?
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Hostname</Th>
              <Th>IP Address</Th>
              <Th>Zones</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device: Device) => (
              <Tr key={device.id}>
                <Td>{device.id}</Td>
                <Td>{device.name}</Td>
                <Td>{device.hostname}</Td>
                <Td>{device.ip_address}</Td>
                <Td>{device.num_zones}</Td>
                <Td>
                  <Flex justifyContent="end">
                    <Box mr={3}>
                      <Link to={`/schedule/${device.id}`}>
                        <Icon as={MdCalendarMonth} />
                      </Link>
                    </Box>
                    <Box mr={3}>
                      <Link to={`/devices/${device.id}`}>
                        <Icon as={MdOutlineAccountTree} />
                      </Link>
                    </Box>
                    <Box mr={3}>
                      <EditDeviceButton
                        device={device}
                        onSubmitted={onEditDevice}
                      />
                    </Box>
                    <Box>
                      <DeleteDeviceButton
                        device={device} 
                        onConfirmed={onDeleteDevice}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        : 
        <Flex align="center" justify="center" pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
          No devices
        </Flex>
        }
      </TableContainer>
    </Card>
  )
}

export default DeviceList

import { Card, CardHeader, Flex, IconButton } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import type { Device } from '../../types/device'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

interface IProps {
  devices: Device[]
  onAddDevice: () => void
  onEditDevice: (id: number) => void
}

export default function DeviceList({devices, onAddDevice, onEditDevice}: IProps) {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md'>Devices</Heading>
          <IconButton 
            aria-label='Add device'
            variant='ghost'
            colorScheme='gray'
            icon={<AddIcon />}
            onClick={onAddDevice}
          />
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
                <Td><EditIcon onClick={() => onEditDevice(device.id)} /></Td>
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

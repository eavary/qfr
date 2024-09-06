import {
  Card, 
  CardHeader, 
  Flex
} from '@chakra-ui/react'
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
import AddDeviceButton from './AddDeviceButton'
import DeleteDeviceButton from './DeleteDeviceButton'
import EditDeviceButton from './EditDeviceButton'

interface IProps {
  devices: Device[]
  onAddDevice: (device: Device) => void
  onDeleteDevice: (id: number) => void
  onEditDevice: (device: Device) => void
  onSelectDevice: (id: number) => void
}

const DeviceList = ({devices, onAddDevice, onDeleteDevice, onEditDevice, onSelectDevice}: IProps) => {
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
                <Td>
                  <div onClick={() => onSelectDevice(device.id as number)}>
                    {device.name}
                  </div>
                </Td>
                <Td>{device.hostname}</Td>
                <Td>{device.ip_address}</Td>
                <Td>
                  {device.num_zones}
                </Td>
                <Td>
                  <Flex justifyContent="end">
                    <EditDeviceButton
                      device={device}
                      onSubmitted={onEditDevice}
                    />
                    <DeleteDeviceButton
                      device={device} 
                      onConfirmed={onDeleteDevice}
                    />
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

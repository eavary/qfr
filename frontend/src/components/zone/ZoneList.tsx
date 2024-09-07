import { Box, Card, CardHeader, Flex } from '@chakra-ui/react'
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

import type { Device } from '../../types/DeviceType'
import type { Zone } from '../../types/ZoneType'
import AddZoneButton from './AddZoneButton'
import DeleteZoneButton from './DeleteZoneButton'
import EditZoneButton from './EditZoneButton'

interface IProps {
  device: Device
  zones: Zone[]
  onAddZone: (zone: Zone) => void
  onDeleteZone: (id: number) => void
  onEditZone: (zone: Zone) => void
}

const ZoneList = ({ device, zones, onAddZone, onDeleteZone, onEditZone }: IProps) => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md'>{device.name}</Heading>
          <AddZoneButton deviceId={device.id as number} onSubmitted={onAddZone} />
        </Flex>
        <Box fontWeight="bold">
          Zones
        </Box>
      </CardHeader>
      <TableContainer>
        {zones.length ?
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {zones.map((zone: Zone) => (
              <Tr key={zone.id}>
                <Td>{zone.id}</Td>
                <Td>{zone.name}</Td>
                <Td>{zone.description}</Td>
                <Td>
                  <Flex justifyContent="end">
                    <EditZoneButton
                      zone={zone}
                      onSubmitted={onEditZone}
                    />
                    <DeleteZoneButton
                      zone={zone}
                      onConfirmed={onDeleteZone}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        :
        <Flex align="center" justify="center" pt={6} borderTop="1px" borderTopColor="blackAlpha.200" pb={8}>
          No zones
        </Flex>
        }
      </TableContainer>
    </Card>
  )
}

export default ZoneList

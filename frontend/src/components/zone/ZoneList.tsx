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

import type { Zone } from '../../types/zone'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

interface IProps {
  zones: Zone[]
  onAddZone: () => void
  onEditZone: (id: number) => void
}

const ZoneList = ({ zones, onAddZone, onEditZone }: IProps) => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading size='md'>Zone List</Heading>
        <IconButton 
          aria-label='Add zone'
          variant='ghost'
          colorScheme='gray'
          icon={<AddIcon />}
          onClick={onAddZone}
        />
      </Flex>
      </CardHeader>
      <TableContainer>
        {zones.length ?
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Device ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {zones.map((zone: Zone) => (
              <Tr key={zone.id}>
                <Td>{zone.id}</Td>
                <Td>{zone.device_id}</Td>
                <Td>{zone.name}</Td>
                <Td>{zone.description}</Td>
                <Td>
                  <EditIcon onClick={() => onEditZone(zone.id)} />
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

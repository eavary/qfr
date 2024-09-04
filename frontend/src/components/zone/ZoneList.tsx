import { Box, Card, CardHeader, Flex, IconButton } from '@chakra-ui/react'
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
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

interface IProps {
  deviceName: string
  zones: Zone[]
  onAddZone: () => void
  onDeleteZone: (id: number) => void
  onEditZone: (id: number) => void
}

const ZoneList = ({ deviceName, zones, onAddZone, onDeleteZone, onEditZone }: IProps) => {
  return (
    <Card mt={6} minWidth="600">
      <CardHeader>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md'>{deviceName}</Heading>
          <IconButton 
            aria-label='Add zone'
            variant='ghost'
            colorScheme='gray'
            icon={<AddIcon />}
            onClick={onAddZone}
          />
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
                    <EditIcon onClick={() => onEditZone(zone.id)} />
                    <DeleteIcon ml={4} color="red.500" onClick={() => onDeleteZone(zone.id)} />
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

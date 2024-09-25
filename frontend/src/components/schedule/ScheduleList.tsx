import { 
  Box, 
  Card, 
  CardHeader, 
  Flex, 
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import type { Device } from '../../types/DeviceType'
import type { Schedule } from '../../types/ScheduleType'
import type { Zone } from '../../types/ZoneType'

import AddScheduleButton from './AddScheduleButton'
import EditScheduleButton from './EditScheduleButton'
import DeleteScheduleButton from './DeleteScheduleButton'

interface ScheduleProps {
  device: Device,
  scheduleItems: Schedule[],
  zones: Zone[],
  onAddSchedule: (schedule: any) => void
  onEditSchedule: (schedule: any) => void
  onDeleteSchedule: (schedule: any) => void
}

const ScheduleList = ({ device, scheduleItems, zones, onAddSchedule, onEditSchedule, onDeleteSchedule }: ScheduleProps) => {

  return (
    <Card mt={16} minWidth="600">
      <CardHeader>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md'>{device.name}</Heading>
          <AddScheduleButton 
            deviceId={device.id as number}
            zones={zones}
            onSubmitted={onAddSchedule}
          />
        </Flex>
        <Box fontWeight="bold">
          Schedule
        </Box>
      </CardHeader>
      <TableContainer>
        {zones.length ?
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Device ID</Th>
              <Th>Zone ID</Th>
              <Th>Day</Th>
              <Th>Start Time</Th>
              <Th>Duration</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {scheduleItems.map((s: Schedule) => (
              <Tr key={s.id}>
                <Td>{s.id}</Td>
                <Td>{s.device_id}</Td>
                <Td>{s.zone_id}</Td>
                <Td>{s.day_of_week}</Td>
                <Td>{s.start_time}</Td>
                <Td>{s.duration}</Td>
                <Td>
                  <Flex justifyContent="end">
                    <Box mr={3}>
                      <EditScheduleButton
                        deviceId={device.id as number}
                        schedule={s}
                        onSubmitted={onEditSchedule}
                      />
                    </Box>
                    <Box>
                      <DeleteScheduleButton
                        schedule={s}
                        onConfirmed={onDeleteSchedule}
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
          No zones
        </Flex>
        }
      </TableContainer>
    </Card>
  )
}

export default ScheduleList

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import type { Device } from '../types/DeviceType'
import type { Zone } from '../types/ZoneType'

import AnimatedLayout from '../layouts/AnimatedLayout'
import DeviceAPIService from '../services/DeviceAPIService'
import ZoneAPIService from '../services/ZoneAPIService'

import ZoneList from '../components/zone/ZoneList'

const Zones = () => {
  const [zones, setZones] = useState([] as Zone[])
  const [selectedDevice, setSelectedDevice] = useState({} as Device)

  const { deviceId } = useParams()

  useEffect(() => {
    if (deviceId) {
      fetchDevice(deviceId)
      fetchZones(deviceId)
    }
  }, [])

  const fetchDevice = async (deviceId: string) => {
    const device = await DeviceAPIService.getDevice(deviceId)
    setSelectedDevice(device[0])
  }

  const fetchZones = async (deviceId: string) => {
    const zones = await ZoneAPIService.getZonesForDevice(deviceId)
    setZones(zones)
  }

  const handleAddZone = async(zone: Zone) => {
    const newId = await ZoneAPIService.addZone(zone)
    setZones(prevState => {
      let zones = [...prevState]
      zones.push({ id: newId, ...zone})
      return zones
    })
  }

  const handleDeleteZone = async(zoneId: number) => {
    await ZoneAPIService.deleteZone(zoneId)
    setZones(prevState => {
      let zones = [...prevState]
      const idx = zones.findIndex(z => z.id === zoneId)
      zones.splice(idx, 1)

      return zones
    })
  }
  
  const handleEditZone = async(zoneData: Zone) => {
    await ZoneAPIService.editZone(zoneData)
    setZones(prevState => {
      let zones = [...prevState]
      const idx = zones.findIndex(z => z.id === zoneData.id)
      zones[idx] = {...zoneData}
      return zones
    })
  }

  return (
    <AnimatedLayout>
      <ZoneList 
        device={selectedDevice}
        zones={zones} 
        onAddZone={handleAddZone}
        onDeleteZone={handleDeleteZone}
        onEditZone={handleEditZone}
      />
    </AnimatedLayout>
  )
}

export default Zones

import React, { useState, useEffect } from 'react'
// import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { Button, Card, CardBody, CardHeader, Input, FormLabel } from '@chakra-ui/react'
// import { Button } from '@/components/ui/button'
// import { Button } from '@chakra-ui/react'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

import type { Zone } from '../../types/zone'

interface IProps {
  deviceId: Number
}

const ZoneManager = ({ deviceId }: IProps) => {
  const [zones, setZones] = useState([] as Zone[])
  const [newZone, setNewZone] = useState({
    device_id: 0,
    name: '',
    description: ''
  } as Zone)
  const [editingZone, setEditingZone] = useState({
    id: 0,
    device_id: 0,
    name: '',
    description: ''
  } as Zone | null)

  useEffect(() => {
    fetchZones()
  }, [deviceId])

  const fetchZones = async () => {
    try {
      const response = await fetch(`/api/devices/${deviceId}/zones`)
      const data = await response.json()
      setZones(data)
    } catch (error) {
      console.error('Error fetching zones:', error)
    }
  }

  const handleCreateZone = async () => {
    try {
      const response = await fetch(`/api/devices/${deviceId}/zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newZone),
      })
      const data = await response.json()
      console.log('handleCreateZone', data)
      // setZones([...zones, data])
      // setNewZone({ name: '', description: '' })
    } catch (error) {
      console.error('Error creating zone:', error)
    }
  }

  const handleUpdateZone = async () => {
    console.log('handleUpdateZone...')
    // try {
    //   const response = await fetch(`/api/zones/${editingZone.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(editingZone),
    //   })
    //   const data = await response.json()
    //   setZones(zones.map(zone => zone.id === data.id ? data : zone))
    //   setEditingZone(null)
    // } catch (error) {
    //   console.error('Error updating zone:', error)
    // }
  }

  const handleDeleteZone = async (id: Number) => {
    console.log('handleDeleteZone', id)
    // try {
    //   await fetch(`/api/zones/${id}`, { method: 'DELETE' })
    //   setZones(zones.filter(zone => zone.id !== id))
    // } catch (error) {
    //   console.error('Error deleting zone:', error)
    // }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>Add New Zone</CardHeader>
        <CardBody>
          <div className="space-y-2">
            <FormLabel htmlFor="newZoneName">Name</FormLabel>
            <Input
              id="newZoneName"
              value={newZone.name}
              onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
            />
            <FormLabel htmlFor="newZoneDescription">Description</FormLabel>
            <Input
              id="newZoneDescription"
              value={newZone.description}
              onChange={(e) => setNewZone({ ...newZone, description: e.target.value })}
            />
            <Button onClick={handleCreateZone}>Add Zone</Button>
          </div>
        </CardBody>
      </Card>

      {zones.map(zone => (
        <Card key={zone.id}>
          <CardBody>
            {editingZone && editingZone.id === zone.id ? (
              <div className="space-y-2">
                <Input
                  value={editingZone.name}
                  onChange={(e) => setEditingZone({ ...editingZone, name: e.target.value })}
                />
                <Input
                  value={editingZone.description}
                  onChange={(e) => setEditingZone({ ...editingZone, description: e.target.value })}
                />
                <Button onClick={handleUpdateZone}>Save</Button>
                <Button onClick={() => setEditingZone(null)}>Cancel</Button>
              </div>
            ) : (
              <div>
                <h3>{zone.name}</h3>
                <p>{zone.description}</p>
                <Button onClick={() => setEditingZone(zone)}>Edit</Button>
                <Button onClick={() => handleDeleteZone(zone.id)}>Delete</Button>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default ZoneManager

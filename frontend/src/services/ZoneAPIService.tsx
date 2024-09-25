import axios from "axios"

import type { Zone } from '../types/ZoneType'

import { API_URL } from "../constants"

const addZone = async (zone: Zone) => {
  try {
    const response = await axios.post(`${API_URL}/zones/add`, zone)
    const newId = response.data.result
    return newId
  } catch (error) {
    console.error('Error adding zone', error)
  }
}

const deleteZone = async (zoneId: number) => {
  try {
    axios.delete(`${API_URL}/zones/${zoneId}`)
  } catch (error) {
    console.error(`Error deleting zone ${zoneId}`, error)
  }
}

const editZone = async (zoneData: Zone) => {
  try {
    await axios.put(`${API_URL}/zones/${zoneData.id}`, zoneData)
  } catch (error) {
    console.error(`Error updating zone ${zoneData.id}`, error)
  }
}

const getZones = async () => {
  try {
    const response = await axios.get(`${API_URL}/zones`)
    return response.data.result
  } catch (error) {
    console.error('Error getting zones', error)
  }
}

const getZonesForDevice = async (deviceId: string) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}/zones`)
    return response.data.result
  } catch (error) {
    console.error('Error getting zones', error)
  }
}

export default {
  addZone,
  deleteZone,
  editZone,
  getZones,
  getZonesForDevice,
}

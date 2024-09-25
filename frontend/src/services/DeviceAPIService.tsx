import axios from "axios"

import type { Device } from '../types/DeviceType'

import { API_URL } from "../constants"

const addDevice = async (device: Device) => {
  try {
    const response = await axios.post(`${API_URL}/devices/add`, device)
    const newId = response.data.result
    return newId
  } catch (error) {
    console.error('Error adding device', error)
  }
}

const deleteDevice = async (deviceId: number) => {
  try {
    axios.delete(`${API_URL}/devices/${deviceId}`)
  } catch (error) {
    console.error(`Error deleting device ${deviceId}`, error)
  }
}

const editDevice = async (deviceData: Device) => {
  try {
    await axios.put(`${API_URL}/devices/${deviceData.id}`, deviceData)
  } catch (error) {
    console.error(`Error updating device ${deviceData.id}`, error)
  }
}

const getDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`)
    return response.data.result
  } catch (error) {
    console.error('Error getting devices', error)
  }
}

const getDevice = async (deviceId: string) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}`)
    return response.data.result
  } catch (error) {
    console.error('Error getting devices', error)
  }
}

export default {
  addDevice,
  deleteDevice,
  editDevice,
  getDevices,
  getDevice,
}

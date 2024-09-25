import axios from "axios"

import type { Schedule } from '../types/ScheduleType'

import { API_URL } from "../constants"

const addSchedule = async (schedule: Schedule) => {
  console.log('addSchedule', schedule)
  try {
    const response = await axios.post(`${API_URL}/schedule/add`, schedule)
    const newId = response.data.result
    return newId
  } catch (error) {
    console.error('Error adding zone', error)
  }
}

const deleteSchedule = async (zoneId: number) => {
  try {
    axios.delete(`${API_URL}/zones/${zoneId}`)
  } catch (error) {
    console.error(`Error deleting zone ${zoneId}`, error)
  }
}

const editSchedule = async (zoneData: Schedule) => {
  try {
    await axios.put(`${API_URL}/zones/${zoneData.id}`, zoneData)
  } catch (error) {
    console.error(`Error updating zone ${zoneData.id}`, error)
  }
}

const getSchedule = async () => {
  try {
    const response = await axios.get(`${API_URL}/zones`)
    return response.data.result
  } catch (error) {
    console.error('Error getting zones', error)
  }
}

const getDeviceSchedules = async (deviceId: string) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}/schedules`)
    return response.data.result
  } catch (error) {
    console.error('Error getting zones', error)
  }
}

export default {
  addSchedule,
  deleteSchedule,
  editSchedule,
  getSchedule,
  getDeviceSchedules,
}

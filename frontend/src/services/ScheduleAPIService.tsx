import axios from "axios"

import type { Schedule } from '../types/ScheduleType'

import { API_URL } from "../constants"

const addSchedule = async (schedule: Schedule) => {
  try {
    const response = await axios.post(`${API_URL}/schedule/add`, schedule)
    const newId = response.data.result
    return newId
  } catch (error) {
    console.error('Error adding schedule', error)
  }
}

const deleteSchedule = async (scheduleId: number) => {
  try {
    axios.delete(`${API_URL}/schedule/${scheduleId}`)
  } catch (error) {
    console.error(`Error deleting schedule ${scheduleId}`, error)
  }
}

const editSchedule = async (scheduleData: Schedule) => {
  try {
    await axios.put(`${API_URL}/schedule/${scheduleData.id}`, scheduleData)
  } catch (error) {
    console.error(`Error updating schedule ${scheduleData.id}`, error)
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

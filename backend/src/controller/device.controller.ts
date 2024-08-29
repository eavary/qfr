import { Request, Response } from "express"
import device from "../db/device"

const getAll = (req: Request, res: Response) => {
  device.selectAll()
    .then(devices => {
      res.status(200).send({
          message: 'OK',
          result: devices
      })
    })
    .catch(err => {
      console.log('catch err', err)
      res.status(500).send({
          message: 'DATABASE ERROR',
          error: err.code
      })
    })
}

const getDevice = (req: Request, res: Response) => {
	const { deviceId } = req.params
  device.selectDevice(deviceId)
    .then(device => {
      res.status(200).send({
          message: 'OK',
          result: device
      })
    })
    .catch(err => {
      console.log('catch err', err)
      res.status(500).send({
          message: 'DATABASE ERROR',
          error: err.code
      })
    })
}

const getDeviceZones = (req: Request, res: Response) => {
	const { deviceId } = req.params
  device.selectZones(deviceId)
    .then(zones => {
      res.status(200).send({
          message: 'OK',
          result: zones
      })
    })
    .catch(err => {
      console.log('catch err', err)
      res.status(500).send({
          message: 'DATABASE ERROR',
          error: err.code
      })
    })
}

export default {
  getAll,
  getDevice,
  getDeviceZones
}

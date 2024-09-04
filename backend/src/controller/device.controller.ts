import { Request, Response } from "express"
import device from "../db/device"

const deleteDevice = (req: Request, res: Response) => {
  const { deviceId } = req.params

  device.deleteDevice(deviceId)
    .then(() => {
      res.status(200).send({
        message: 'OK',
        result: true
      })
    })
    .catch(err => {
      res.status(500).send({
          message: 'DATABASE ERROR',
          error: err.code,
          result: false
      })
    })
}

const add = (req: Request, res: Response) => {
  device.insertDevice(req.body)
    .then(result => {
        res.status(200).send({
          message: 'OK',
          result: result.insertId
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

const update = (req: Request, res: Response) => {
  const { id, ...data } = req.body

  device.updateDevice(id, data)
    .then(() => {
        res.status(200).send({
          message: 'OK',
          result: true
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
  add,
  deleteDevice,
  getAll,
  getDevice,
  getDeviceZones,
  update
}

import { Request, Response } from "express"
import device from "../db/device"

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

const insert = (req: Request, res: Response) => {
  device.insert(req.body)
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

const remove = (req: Request, res: Response) => {
  const { deviceId } = req.params

  device.remove(deviceId)
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

const update = (req: Request, res: Response) => {
  const { id, ...data } = req.body

  device.update(id, data)
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

const list = (req: Request, res: Response) => {
  device.list()
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

export default {
  getDevice,
  getDeviceZones,
  insert,
  list,
  remove,
  update,
}

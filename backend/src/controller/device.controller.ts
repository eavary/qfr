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

export default { getAll }

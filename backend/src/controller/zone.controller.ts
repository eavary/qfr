import { Request, Response } from "express"
import zone from "../db/zone"

const deleteZone = (req: Request, res: Response) => {
  const { zoneId } = req.params

  zone.deleteZone(zoneId)
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

const getAll = (req: Request, res: Response) => {
  zone.selectAll()
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
  deleteZone,
  getAll,
}

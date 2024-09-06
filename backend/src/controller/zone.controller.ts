import { Request, Response } from "express"
import zone from "../db/zone"

const insert = (req: Request, res: Response) => {
  zone.insert(req.body)
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

const list = (req: Request, res: Response) => {
  zone.list()
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

const remove = (req: Request, res: Response) => {
  const { zoneId } = req.params

  zone.remove(zoneId)
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

export default {
  insert,
  list,
  remove,
}

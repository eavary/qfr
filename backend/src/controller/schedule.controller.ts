import { Request, Response } from "express"
import schedule from "../db/schedule"

const insert = (req: Request, res: Response) => {
  schedule.insert(req.body)
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
  const { deviceId } = req.params
  schedule.list(deviceId)
    .then(schedule => {
      res.status(200).send({
          message: 'OK',
          result: schedule
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
  const { scheduleId } = req.params

  schedule.remove(scheduleId)
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

  schedule.update(id, data)
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

export default {
  insert,
  list,
  remove,
  update,
}

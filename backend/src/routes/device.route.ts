import { Router } from "express"
import deviceController from "../controller/device.controller"

const deviceRouter = Router()

// endpoints and their corresponding method calls
deviceRouter.get('/', deviceController.list)
deviceRouter.get('/:deviceId', deviceController.getDevice)
deviceRouter.get('/:deviceId/zones', deviceController.getDeviceZones)
deviceRouter.get('/:deviceId/schedules', deviceController.getDeviceSchedules)

deviceRouter.delete('/:deviceId', deviceController.remove)

deviceRouter.post('/add', deviceController.insert)

deviceRouter.put('/:deviceId', deviceController.update)

// export the router
export default deviceRouter

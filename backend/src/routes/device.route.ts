import { Router } from "express"
import deviceController from "../controller/device.controller"

const deviceRouter = Router()

// endpoints and their corresponding method calls
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:deviceId', deviceController.getDevice)
deviceRouter.get('/:deviceId/zones', deviceController.getDeviceZones)

deviceRouter.delete('/:deviceId', deviceController.deleteDevice)

deviceRouter.post('/add', deviceController.add)

deviceRouter.put('/:deviceId', deviceController.update)

// export the router
export default deviceRouter

import { Router } from "express"
import zoneController from "../controller/zone.controller"

const zoneRouter = Router()

// endpoints and their corresponding method calls
zoneRouter.get('/', zoneController.list)

zoneRouter.delete('/:zoneId', zoneController.remove)

zoneRouter.post('/add', zoneController.insert)

zoneRouter.put('/:deviceId', zoneController.update)

// export the router
export default zoneRouter

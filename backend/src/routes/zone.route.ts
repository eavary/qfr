import { Router } from "express"
import zoneController from "../controller/zone.controller"

const zoneRouter = Router()

// endpoints and their corresponding method calls
zoneRouter.get('/', zoneController.getAll)

zoneRouter.delete('/:zoneId', zoneController.deleteZone)

// export the router
export default zoneRouter

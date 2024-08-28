import { Router } from "express"
import zoneController from "../controller/zone.controller"

const zoneRouter = Router()

// specifies the endpoint and the method to call
zoneRouter.get('/', zoneController.getAll)

// export the router
export default zoneRouter

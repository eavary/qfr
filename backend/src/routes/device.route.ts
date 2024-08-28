import { Router } from "express"
import deviceController from "../controller/device.controller"

const deviceRouter = Router()

// specifies the endpoint and the method to call
deviceRouter.get('/', deviceController.getAll)

// export the router
export default deviceRouter

import { Router } from "express"
import scheduleController from "../controller/schedule.controller"

const scheduleRouter = Router()

// endpoints and their corresponding method calls
scheduleRouter.get('/', scheduleController.list)

scheduleRouter.delete('/:scheduleId', scheduleController.remove)

scheduleRouter.post('/add', scheduleController.insert)

scheduleRouter.put('/:scheduleId', scheduleController.update)

// export the router
export default scheduleRouter

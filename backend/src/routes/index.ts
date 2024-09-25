import { Router } from "express"
import deviceRouter from "./device.route"
import mqttRouter from './mqtt.route'
import scheduleRouter from './schedule.route'
import zoneRouter from "./zone.route"

const routes = Router()

// define the base path and the router that's going to be called
routes.use('/devices', deviceRouter)
routes.use('/mqtt', mqttRouter)
routes.use('/zones', zoneRouter)
routes.use('/schedule', scheduleRouter)

// export the route
export default routes

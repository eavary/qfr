import { Router } from "express"
import mqttController from "../controller/mqtt.controller"

const mqttRouter = Router()

mqttRouter.get('/arm', mqttController.arm)
mqttRouter.get('/connect', mqttController.connect)
mqttRouter.get('/disarm', mqttController.disarm)

export default mqttRouter

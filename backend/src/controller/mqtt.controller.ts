import { Request, Response } from 'express'
const mqtt = require('mqtt')

const MOSQUITTO_URL = "mqtt://mosquitto:1883"

const connect = (req: Request, res: Response) => {
  const client = mqtt.connect(MOSQUITTO_URL)

  client.on("connect", () => {
    client.subscribe("presence", (err) => {
      if (!err) {
        client.publish("presence", "Hello mqtt")
      }
    })
  })

  client.on("message", (topic, message) => {
    // message is Buffer
    console.log(message.toString())
    client.end()
    res.json({"success": "true"})
  })

  client.on("error", (error) => {
    console.log('connection error', error)
    client.end()
    res.json({"success": "false"})
  })
}

const arm = (req: Request, res: Response) => {
  const client = mqtt.connect(MOSQUITTO_URL)

  client.on("connect", () => {
    client.subscribe("arm", err => {
      if (!err) {
        client.publish("arm", "Device armed")
      }
    })
  })

  client.on("message", (topic, message) => {
    // message is Buffer
    console.log(message.toString())
    client.end()
    res.json({"success": "true"})
  })

  client.on("error", (error) => {
    console.log('connection error', error)
    client.end()
    res.json({"success": "false"})
  })
}

const disarm = (req: Request, res: Response) => {
  const client = mqtt.connect(MOSQUITTO_URL)

  client.on("connect", () => {
    client.subscribe("disarm", err => {
      if (!err) {
        client.publish("disarm", "Device disarmed")
      }
    })
  })

  client.on("message", (topic, message) => {
    // message is Buffer
    console.log(message.toString())
    client.end()
    res.json({"success": "true"})
  })

  client.on("error", (error) => {
    console.log('connection error', error)
    client.end()
    res.json({"success": "false"})
  })
}

export default {
  arm,
  connect,
  disarm,
}

const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");

// Create the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const mysqlConfig = {
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "pass123",
  database: process.env.DB_NAME || "qfrdb",
};

let con = null;
const databaseInit = () => {
  con = mysql.createConnection(mysqlConfig);
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the database");
  });
};

// GET request
app.get("/devices", (req, res) => {
  databaseInit()
  con.query("SELECT * FROM devices", (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(results);
    }
  })
})

app.get('/devices/:deviceId/zones', (req, res) => {
  const { deviceId } = req.params
  databaseInit()
  con.query(`SELECT * FROM zones WHERE device_id = ${deviceId}`, (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("Error retrieving data from database")
    } else {
      res.json(results);
    }
  })
})

// POST request
app.post("/device", (req, res) => {
  con.query(
    "INSERT INTO devices (name, ip_address, hostname, num_zones) VALUES (?)",
    [req.body.data],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(results);
      }
    }
  );
});

/****************************************
 *               MQTT
 ****************************************/

app.get("/device/connect", (req, res) => {
  const client = mqtt.connect("mqtt://mosquitto:1883")

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
})

app.get("/device/arm", (req, res) => {
  const client = mqtt.connect("mqtt://mosquitto:1883")

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
})

app.get("/device/disarm", (req, res) => {
  const client = mqtt.connect("mqtt://mosquitto:1883")

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
})

/****************************************/

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

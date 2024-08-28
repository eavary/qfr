// import needed libraries
import * as express from "express"
import * as bodyParser from "body-parser"

var cors = require("cors");

import routes from "./routes"

// get express application
const app = express()
app.use(cors());

app.use('/api', routes)

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// define app port
const port = process.env.PORT || 3000

// starts the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

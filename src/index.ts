// use express
import express from "express"
//cronjob
import cron from "node-cron"
// import color to use in the console.
import "colors"
// use dotenv to get the environment variables.
require("dotenv").config()
// import database
import connect from "./database/connect"
// make app
const app = express()
// port
const port = process.env.PORT || 1447 // default port to listen
import http from "http"
// make body parser
const cors = require("cors")
// body parser
const bodyParser = require("body-parser")
// body parser
app.use(
  bodyParser.json({
    verify: (req: any, res: any, buf: any, encoding: any) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8")
      }
    },
  })
)
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
// connect to database
connect(process.env.DATABASE_NAME)
// cors
app.use(cors())
// routers
app.use("/api", require("./routes"))

const server = require("http").createServer(app)
export const io = require("socket.io")(server)

io.on("connection", (socket) => {
  socket.on("chat message", (message) => {
    console.log("Received message:", message)
  })
})
// //cronjob  2 minutes interval change user online status to false


// for listening
server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

import express from "express"

// router
const Router = express.Router()
import userCheck from "../middleware/auth/userCheck"

//  make message
Router.use("/user", require("./user"))
Router.post("/updateProfile", userCheck, Image)

module.exports = Router

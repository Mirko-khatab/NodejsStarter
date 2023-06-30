import User from "../../database/models/User"
import Conversation from "../../database/models/Conversation"
import Room from "../../database/models/Room"
import Message from "../../database/models/Message"

const Crown = async (req, res, next) => {
  try {
    //target id
    const { id } = req?.params

    //us
    const { user } = req
    if (
      user.role == "admin" ||
      user.role == "merchant" ||
      user.role == "super_admin" ||
      "manager"
    )
      next()
    else throw Error("you don't have access")
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}
export default Crown

import Conversation from "../../database/models/Conversation"
import Room from "../../database/models/Room"

const checkIsUserInConversion = async (req, res, next) => {
  try {
    const { id } = req?.params
    const { user } = req
    const room: any = await Room?.findById(id)
    req.room = room
    if (!room) throw new Error("room not found")
    const conversation = await Conversation?.findOne({
      room: room?._id,
      user: user?._id,
    })
    // conversation not found created
    if (!conversation && room.type != "private") {
      // in hare check if user not invited and the room is private return error
      const conversationCreated = await Conversation.create({
        room: room?._id,
        user: user?._id,
      })
      req.conversation = conversationCreated
      return next()
    } else {
      if (conversation?.isBlocked || !conversation)
        throw new Error("you can't send to this room")
      req.conversation = conversation
      return next()
    }
  } catch (error) {
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}
export default checkIsUserInConversion

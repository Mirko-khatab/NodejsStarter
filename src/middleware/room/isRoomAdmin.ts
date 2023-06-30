import Room from "../../database/models/Room"
const isRoomAdmin = async (req, res, next) => {
  try {
    const { id } = req?.params
    const room = await Room?.findById(id)
    req.room = room
    const { user } = req
    if (user?.owner?.toString() == room?.owner) return next()
    // get admin from room.admins
    const admins = room?.admins
    const admin = admins?.find((admin) => admin?.user?.toString() == user?._id)
    if (admin) return next()
    return res.status(401).send({
      message: "you don't have e access",
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}
export default isRoomAdmin

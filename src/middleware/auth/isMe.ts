import mongoose from "mongoose"
const ieMe = async (req, res, next) => {
  try {
    const { id } = req?.params
    const { user } = req

    if (user?._id != id && user?.role != "admin")
      return res.status(401).send({
        message: "you don't have account",
      })
    else next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}
export default ieMe

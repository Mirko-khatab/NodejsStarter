import { getUserToken } from "../../helpers/jwt"
import { isUserInvisibleExpire } from "../../helpers/isUserInvisibleExpire"
const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user: any = await getUserToken(token)
    if (!user)
      return res.status(401).send({
        message: "you don't have account",
      })
    if (user?.isBlocked)
      return res.status(401).send({
        message: "you can't use this service",
      })
    let isHaveInvisibleMode = false
    // check if user have invisible
    if (user?.invisible?.expire)
      isHaveInvisibleMode = await !isUserInvisibleExpire({
        user,
      })
    if (isHaveInvisibleMode) {
      user.isOnline = user?.invisible?.status
      await user.save()
      req.user = user
      next()
    } else {
      user.isOnline = true
      user.lastRequestTime = Date.now()
      await user.save()
      req.user = user
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}
export default isUser
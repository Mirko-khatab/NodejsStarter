import mongoose from "mongoose"
export const connect = async (DATABASE_NAME) => {
  try {
    // check is provided database name
    if (!DATABASE_NAME) throw Error("No mongo uri was provided.")
    // try to connect
    await mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
    // connect console
    console.log(`Database connected... to ${DATABASE_NAME}`.blue)
  } catch (error) {
    // if we have error so return in error
    if (error instanceof Error) console.log(error.message.red)
  }
}
export default connect

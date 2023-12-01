import mongoose from 'mongoose'
import { DB_URL } from '$env/static/private'

export const connectDB = async () => {
  console.log("mongoose.connection.readyState: ", mongoose.connection.readyState)
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DB_URL, { autoIndex: true })
      console.log("Mongo connected successfully.")
    }
  } catch (err) {
      console.error (err)
    }
}
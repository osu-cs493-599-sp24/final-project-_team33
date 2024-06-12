import mongoose from "mongoose"

export const startMongo = async (): Promise<void> => {
  const url = process.env.MONGO_URL
  console.log("Mongo Url", url)
  if (!url) {
    throw new Error("MONGO_URL is not set")
  }
  await mongoose.connect(url, {
    socketTimeoutMS: 0,
  })
  console.log(`Connected to MongoDB: ${url}`)
}

import { createClient } from "redis"

const redisOption = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
}

class Redis {
  client: any // Add this line to declare the 'client' property
  constructor() {
    this.client = null
  }

  async connect() {
    console.log("connecting to redis")
    console.log({ redisOption })
    this.client = await createClient(redisOption)
      .on("error", (err: any) => {
        console.log("Error", err)
        throw new Error("Error connecting to redis")
      })
      .connect()
    console.log(`connected to redis ${redisOption.url}`)
    return this.client
  }

  getClient() {
    return this.client
  }
}

const redis = new Redis()

export default redis

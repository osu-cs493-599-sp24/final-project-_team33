import type { Express, Request, Response } from "express"

import { IError } from "./main.type"
import cors from "cors"
import dotenv from "dotenv"
import errorMiddleware from "./middleware/error"
import express from "express"
import redis from "./lib/redis"
import router from "./route.main"
import { startMongo } from "./lib/mongo"

dotenv.config()

const app: Express = express()

const PORT = process.env.PORT || 3000

// general middlewares for all routes
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.get("/check", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" })
})

app.use("/api/v1", router)

// Handle path not found
app.use("*", function (req: Request, res: Response) {
  res.status(404).send({
    err: "This URL was not recognized: " + req.originalUrl,
  })
})

// Handle Error Middleware
app.use(errorMiddleware)

const startMainProgram = async (): Promise<void> => {
  // startMongo()
  await startMongo()
  await redis.connect()

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startMainProgram()

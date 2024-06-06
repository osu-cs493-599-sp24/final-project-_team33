import type { Express, Request, Response } from "express"

import { Error } from "./main.type"
import cors from "cors"
import express from "express"
import router from "./route.main"

// import { swaggerSpec } from "./swagger"

const app: Express = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.get("/check", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" })
})

app.use("/api/v1", router)

app.use("*", function (req: Request, res: Response) {
  res.status(404).send({
    err: "This URL was not recognized: " + req.originalUrl,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

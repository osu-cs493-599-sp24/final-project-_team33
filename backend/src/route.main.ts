import type { Router } from "express"
// import businessRouter from "./business/business.route"
import express from "express"
import userRouter from "./user/user.route"

const router: Router = express.Router()

router.use("/users", userRouter)

export default router

import type { Router } from "express"
// import businessRouter from "./business/business.route"
import express from "express"
import userRouter from "./user/user.route"
// import photoRouter from "./photo/photo.route"
// import reviewRouter from "./review/review.route"

const router: Router = express.Router()

router.use("/users", userRouter)

// router.use("/businesses", businessRouter)
// router.use("/photos", photoRouter)
// router.use("/reviews", reviewRouter)

export default router

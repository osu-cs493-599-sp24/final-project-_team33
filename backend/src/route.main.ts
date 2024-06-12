import type { Router } from "express"
// import businessRouter from "./business/business.route"
import express from "express"
import userRouter from "./user/user.route"
import assignmentRouter from "./assignment/assignment.route"
import submissionRouter from "./submission/submission.route"

import courseRouter from "./course/course.route"
const router: Router = express.Router()

router.use("/users", userRouter)
router.use("/assignments", assignmentRouter)
router.use("/submissions", submissionRouter)

router.use("/courses", courseRouter)

export default router

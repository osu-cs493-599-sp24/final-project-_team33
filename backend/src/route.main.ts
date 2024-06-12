import type { Router } from "express"
import assignmentRouter from "./assignment/assignment.route"
import courseRouter from "./course/course.route"
import express from "express"
import submissionRouter from "./submission/submission.route"
import userRouter from "./user/user.route"

const router: Router = express.Router()

router.use("/users", userRouter)
router.use("/assignments", assignmentRouter)
router.use("/submissions", submissionRouter)
router.use("/courses", courseRouter)

export default router

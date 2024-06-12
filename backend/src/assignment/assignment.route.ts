import type { Router } from "express"
import { assignmentController } from "./assignment.controller"
import { authMiddleWare } from "../middleware/auth"
import express from "express"

const router: Router = express.Router()

router.post("/", authMiddleWare(["instructor", "admin"]), assignmentController.createAssignment)
router.get("/:id", assignmentController.getAssignmentById)
router.patch("/:id", assignmentController.updateAssignmentById)
router.delete("/:id", assignmentController.deleteAssignmentById)

//Submission routes
router.get("/:id/submissions", assignmentController.getSubmissionsByAssignmentId)
router.post("/:id/submissions", assignmentController.createSubmission)

export default router

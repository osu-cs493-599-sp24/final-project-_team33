import type { Router } from "express"
import { assignmentController } from "./assignment.controller"
import { authMiddleWare } from "../middleware/auth"
import express from "express"
import { upload } from "../lib/upload"

const router: Router = express.Router()

router.post("/", authMiddleWare(["instructor", "admin"]), assignmentController.createAssignment)
router.get("/:id", assignmentController.getAssignmentById)
router.patch(
  "/:id",
  authMiddleWare(["instructor", "admin"]),
  assignmentController.updateAssignmentById
)
router.delete(
  "/:id",
  authMiddleWare(["instructor", "admin"]),
  assignmentController.deleteAssignmentById
)

//Submission routes
router.get("/:id/submissions", assignmentController.getSubmissionsByAssignmentId)

router.post(
  "/:id/submissions",
  authMiddleWare(["student"]),
  upload.single("file"),
  assignmentController.createSubmission
)

// router.patch(
//   "/:id/submissions",
//   authMiddleWare(["instructor", "admin"]),
//   upload.single("file"),
//   assignmentController.updateSubmission
// )

export default router

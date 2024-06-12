import type { Router } from "express"
import { authMiddleWare } from "../middleware/auth"
import { courseController } from "./course.controller"
import express from "express"

const router: Router = express.Router()

router.get("/", courseController.getCourses)
router.post("/", authMiddleWare(["instructor", "admin"]), courseController.createCourse)
router.get("/:courseId", courseController.getSpecificCourse)
router.patch("/:courseId", authMiddleWare(["instructor", "admin"]), courseController.updateCourse)
router.delete("/:courseId", authMiddleWare(["admin"]), courseController.deleteCourse)
router.get(
  "/:courseId/students",
  authMiddleWare(["instructor", "admin"]),
  courseController.getCourseStudents
)
router.post(
  "/:courseId/students",
  authMiddleWare(["instructor", "admin"]),
  courseController.updateEnrollment
)
router.delete("/:courseId/students", authMiddleWare(["admin"]), courseController.removeEnrollment)
router.get("/:courseId/roster", courseController.fetchCSVstudents)
router.get("/:courseId/assignments", courseController.fetchCourseAssignment)

export default router

import type { Router } from "express"
import { authMiddleWare } from "../middleware/auth"
import { courseController } from "./course.controller"
import express from "express"

const router: Router = express.Router()

router.get("/", courseController.getCourses)
router.post("/", authMiddleWare(["instructor", "admin"]), courseController.createCourse)
router.get("/:courseId", courseController.getSpecificCourse)
router.patch("/:courseId", courseController.updateCourse)
router.delete("/:courseId", courseController.deleteCourse)
router.get("/:courseId/students", courseController.getCourseStudents)
router.post("/:courseId/students", courseController.updateEnrollment)
router.delete("/:courseId/students", courseController.removeEnrollment)
router.get("/:courseId/roster", courseController.fetchCSVstudents)
router.get("/:courseId/assignments", courseController.fetchCourseAssignment)

export default router

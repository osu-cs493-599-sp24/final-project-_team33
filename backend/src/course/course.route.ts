import type { Router } from "express"
import express from "express"
import { courseController } from "./course.controller"

const router: Router = express.Router()

router.get("/", courseController.getCourses)
router.post("/", courseController.createCourse)
router.get("/:courseId", courseController.getSpecificCourse)
router.patch("/:courseId", courseController.updateCourse)
router.delete("/:courseId", courseController.deleteCourse)
router.get("/:courseId/students", courseController.getCourseStudents)
router.post("/:courseId/students", courseController.updateEnrollment)
router.delete("/:courseId/students", courseController.removeEnrollment);
router.get("/:courseId/roster", courseController.fetchCSVstudents)
router.get("/:courseId/assignments", courseController.fetchCourseAssignment)

export default router

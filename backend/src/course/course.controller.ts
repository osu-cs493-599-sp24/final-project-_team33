import { CourseRequestBody, ICourse } from "./course.type"
import type { NextFunction, Request, Response } from "express"

import _ from "lodash"
import courseHandler from "./model/course.handler"
import mongoose from "mongoose"
import { number } from "joi"

class CourseController {
  // Retrieve all courses
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const { courses, total } = await courseHandler.getCourses(page, limit)
      res.status(200).json({
        message: "Courses retrieved successfully.",
        data: courses,
        total,
        page,
        pages: Math.ceil(total / limit),
      })
    } catch (error: any) {
      next(error)
    }
  }

  // Create a new course
  async createCourse(req: any, res: Response, next: NextFunction) {
    try {
      const courseBody: CourseRequestBody = req.body
      const user = req.user
      const bodyAssignment = {
        ...courseBody,
        instructorId: user._id,
      }
      const newCourse: ICourse = await courseHandler.addCourse(bodyAssignment)
      res.status(201).json({ message: "Course created successfully.", data: newCourse })
    } catch (error: any) {
      next(error)
    }
  }

  // Retrieve a specific course by ID
  async getSpecificCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const course: ICourse = await courseHandler.getCourseById(Number(courseId))
      res.status(200).json({ message: "Course retrieved successfully.", data: course })
    } catch (error: any) {
      next(error)
    }
  }

  // Update a specific course by ID
  async updateCourse(req: any, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const courseBody: Partial<ICourse> = req.body
      const user = req.user
      const course = await courseHandler.getCourseById(Number(courseId))
      if (!course) {
        throw new Error("Course not found")
      }
      if (!course.instructorId.equals(user._id)) {
        throw new Error("Unauthorized access")
      }
      const updatedCourse: ICourse = await courseHandler.updateCourseById(
        Number(courseId),
        courseBody
      )
      res.status(200).json({ message: "Course updated successfully.", data: updatedCourse })
    } catch (error: any) {
      next(error)
    }
  }

  // Delete a specific course by ID
  async deleteCourse(req: any, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== "admin") {
        throw new Error("Unauthorized access")
      }
      const { courseId } = req.params
      await courseHandler.deleteCourseById(Number(courseId))
      res.status(200).json({ message: "Course deleted successfully." })
    } catch (error: any) {
      next(error)
    }
  }

  // Retrieve students enrolled in a specific course
  async getCourseStudents(req: any, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const user = req.user
      const course = await courseHandler.getCourseById(Number(courseId))
      if (!course) {
        throw new Error("Course not found")
      }
      if (!course.instructorId.equals(user._id)) {
        throw new Error("Unauthorized access")
      }
      const students = await courseHandler.getStudentsByCourseId(Number(courseId))
      console.log(students)
      res.status(200).json({ message: "Students retrieved successfully.", students })
    } catch (error: any) {
      next(error)
    }
  }

  // Update enrollment for a specific course
  async updateEnrollment(req: any, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const { studentId } = req.body
      const user = req.user
      const course = await courseHandler.getCourseById(Number(courseId))
      if (!course) {
        throw new Error("Course not found")
      }
      if (!course.instructorId.equals(user._id)) {
        throw new Error("Unauthorized access")
      }
      await courseHandler.addEnrollment(Number(courseId), new mongoose.Types.ObjectId(studentId))
      res.status(200).json({ message: "Enrollment updated successfully." })
    } catch (error: any) {
      next(error)
    }
  }
  async removeEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const { studentId } = req.body
      await courseHandler.removeEnrollment(Number(courseId), new mongoose.Types.ObjectId(studentId))
      res.status(200).json({ message: "Student removed successfully." })
    } catch (error: any) {
      next(error)
    }
  }

  // Fetch a CSV list of students enrolled in a specific course
  async fetchCSVstudents(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const csvData: string = await courseHandler.getCSVStudentList(Number(courseId))
      res.header("Content-Type", "text/csv")
      res.header("Content-Disposition", 'attachment; filename="students.csv"')
      res.status(200).send(csvData)
    } catch (error: any) {
      next(error)
    }
  }

  // Retrieve assignments for a specific course
  async fetchCourseAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params
      const assignments: string[] = await courseHandler.getAssignmentsByCourseId(Number(courseId))
      res
        .status(200)
        .json({ message: "Assignments retrieved successfully.", assignments: assignments })
    } catch (error: any) {
      next(error)
    }
  }
}

export const courseController = new CourseController()

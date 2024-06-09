import { CourseRequestBody, ICourse } from "../course.type"

import CourseModel from "./course.model"
import { IError } from "../../main.type"

export interface ICourseHandler {
  getCourseById: (courseId: string) => Promise<ICourse>
  addCourse: (course: CourseRequestBody) => Promise<ICourse>
  updateCourse: (courseId: string, course: ICourse) => Promise<ICourse>
}

class CourseHandler implements ICourseHandler {
  async getCourseById(courseId: string): Promise<ICourse> {
    const course: ICourse | null = await CourseModel.findById(courseId)
    if (!course) {
      const error: IError = new Error("Course not found")
      error.status = 404
      throw error
    }
    return course
  }

  async addCourse(course: CourseRequestBody): Promise<ICourse> {
    const newCourse = new CourseModel(course)
    await newCourse.save()
    return newCourse
  }

  async updateCourse(courseId: string, course: ICourse): Promise<ICourse> {
    const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, course, {
      new: true,
    })
    if (!updatedCourse) {
      const error: IError = new Error("Course not found")
      error.status = 404
      throw error
    }
    return updatedCourse
  }
}

const courseHandler = new CourseHandler()

export default courseHandler

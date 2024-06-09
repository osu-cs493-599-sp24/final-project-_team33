import { CourseRequestBody, ICourse } from "../course.type"

import CourseModel from "./course.model"
import { IError } from "../../main.type"

export interface ICourseHandler {
  getCourses: () => Promise<ICourse[]>
  addCourse: (course: CourseRequestBody) => Promise<ICourse>
  getCourseById: (courseId: string) => Promise<ICourse>
  updateCourseById: (courseId: string, course: ICourse) => Promise<ICourse>
  deleteCourseById: (courseId: string) => Promise<void>
  getStudentsByCourseId: (courseId: string) => Promise<string[]>
  addEnrollment: (courseId: string, studentId: string) => Promise<void>
  getCSVStudentList: (courseId: string) => Promise<string>
  getAssignmentsByCourseId: (courseId: string) => Promise<string[]>
}

class CourseHandler implements ICourseHandler {
  async getCourses(): Promise<ICourse[]> {
    return []
  }
  async addCourse(course: CourseRequestBody): Promise<ICourse> {
    return {} as ICourse
  }
  async getCourseById(courseId: string): Promise<ICourse> {
    return {} as ICourse
  }
  async updateCourseById(courseId: string, course: ICourse): Promise<ICourse> {
    return {} as ICourse
  }
  async deleteCourseById(courseId: string): Promise<void> {}
  async getStudentsByCourseId(courseId: string): Promise<string[]> {
    return []
  }
  async addEnrollment(courseId: string, studentId: string): Promise<void> {}
  async getCSVStudentList(courseId: string): Promise<string> {
    return ""
  }
  async getAssignmentsByCourseId(courseId: string): Promise<string[]> {
    return []
  }
}

const courseHandler = new CourseHandler()

export default courseHandler

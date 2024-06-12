import { number } from "joi"
import { CourseRequestBody, ICourse } from "../course.type"
import CourseModel from "./course.model"
import userModel from "../../user/model/user.model"
import { error } from "console"
import mongoose, { ObjectId } from "mongoose"
export interface ICourseHandler {
  getCourses: (page: number, limit: number) => Promise<{
    courses: ICourse[], total: number
  }>
  addCourse: (course: CourseRequestBody) => Promise<ICourse>
  getCourseById: (courseId: number) => Promise<ICourse>
  updateCourseById: (courseId: number, course: Partial<ICourse>) => Promise<ICourse>
  deleteCourseById: (courseId: number) => Promise<void>
  getStudentsByCourseId: (courseId: number, userId: number) => Promise<{ name: string; email: string; role: string }[]>
  addEnrollment: (courseId: number, studentId: mongoose.Types.ObjectId) => Promise<void>
  removeEnrollment: (courseId: number, studentId: mongoose.Types.ObjectId) => Promise<void>
  getCSVStudentList: (courseId: number) => Promise<string>
  getAssignmentsByCourseId: (courseId: number) => Promise<string[]>
}

class CourseHandler implements ICourseHandler {
  async getCourses(page: number, limit: number): Promise<{ courses: ICourse[], total: number }> {

    const skip = (page - 1) * limit
    const courses = await CourseModel.find().skip(skip).limit(limit).exec() as ICourse[]
    const total = await CourseModel.countDocuments().exec()
    return { courses, total }
  }

  async addCourse(course: CourseRequestBody): Promise<ICourse> {
    const newCourse = new CourseModel(course)
    return await newCourse.save() as ICourse
  }

  async getCourseById(courseId: number): Promise<ICourse> {
    return await CourseModel.findOne({ courseId }).exec() as ICourse
  }

  async updateCourseById(courseId: number, course: Partial<ICourse>): Promise<ICourse> {
    return await CourseModel.findOneAndUpdate({ courseId }, course, { new: true }).exec() as ICourse
  }

  async deleteCourseById(courseId: number): Promise<void> {
    await CourseModel.findOneAndDelete({ courseId }).exec()
  }

  async getStudentsByCourseId(courseId: number): Promise<{ name: string; email: string; role: string }[]> {
    const course = await CourseModel.findOne({ courseId }).populate('students').exec()
    if (!course) {
      throw new Error("course not found")
    }
    return course.students.map((student: any) => ({
      name: student.name,
      email: student.email,
      role: student.role
    }))
  }

  async addEnrollment(courseId: number, studentId: mongoose.Types.ObjectId): Promise<void> {
    const course = await CourseModel.findOne({ courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error('Invalid student ID');
    }

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }
    // await CourseModel.findByIdAndUpdate(courseId, { $addToSet: { students: studentId } }).exec()
  }

  async removeEnrollment(courseId: number, studentId: mongoose.Types.ObjectId): Promise<void> {
    const course = await CourseModel.findOne({ courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error('Invalid student ID');
    }

    course.students = course.students.filter(id => !id.equals(studentId));
    await course.save();
  }

  async getCSVStudentList(courseId: number): Promise<string> {
    const course = await CourseModel.findOne({ courseId }).populate('students').exec()
    const csvData = course.students.map((student: any) => `${student._id},${student.name},${student.email}`).join('\n')
    return `ID,Name,Email\n${csvData}`
  }

  async getAssignmentsByCourseId(courseId: number): Promise<string[]> {
    const course = await CourseModel.findById(courseId).populate('assignments').exec()
    return course.assignments.map((assignment: any) => assignment._id.toString())
  }
}

const courseHandler = new CourseHandler()
export default courseHandler

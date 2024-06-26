import { ObjectId } from "mongoose"

export interface ICourse {
  _id?: ObjectId
  description: string
  subject: string
  courseId: number
  title: string
  term: string
  instructorId: string | number
  createdAt?: Date
  updatedAt?: Date
}

export type CourseRequestBody = Omit<ICourse, "_id" | "description" | "createdAt" | "updatedAt">

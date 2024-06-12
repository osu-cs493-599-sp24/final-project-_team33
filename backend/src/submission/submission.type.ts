import { Number } from "mongoose"

export interface ISubmission {
  _id?: string
  assignmentId: Number
  studentId: Number
  timestamp: Date
  grade?: Number
  file: string
}


export type SubmissionRequestBody = Omit<ISubmission, "_id" | "grade">
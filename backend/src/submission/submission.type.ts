export interface ISubmission {
  _id?: string
  description: string
  assignmentId: string
  studentId: string
  score: number
  fileIds: string[]
  createdAt: Date
  updatedAt: Date
}

export type SubmissionRequestBody = {}

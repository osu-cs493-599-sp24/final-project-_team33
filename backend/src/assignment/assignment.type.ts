export interface IAssignment {
  _id?: any
  title: string
  description: string
  courseId: string
  dueDate: Date
  createdAt?: Date
  updatedAt?: Date
}

export type AssignmentRequestBody = Omit<IAssignment, "_id" | "createdAt" | "updatedAt">

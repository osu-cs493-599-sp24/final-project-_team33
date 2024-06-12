export interface IAssignment {
  _id?: any
  courseId: string
  title: string
  points: number
  due: string
  createdAt?: Date
  updatedAt?: Date
}

export type AssignmentRequestBody = Omit<IAssignment, "_id" | "createdAt" | "updatedAt">

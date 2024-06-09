export interface ICourse {
  _id?: any
  description: string
  subject: string
  number: number
  title: string
  term: string
  instructorId: string | number
  createdAt?: Date
  updatedAt?: Date
}

export type CourseRequestBody = Omit<ICourse, "_id" | "description" | "createdAt" | "updatedAt">

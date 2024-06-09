export interface IUser {
  _id?: any
  description?: string
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export type UserRequestBody = Omit<IUser, "_id" | "description">

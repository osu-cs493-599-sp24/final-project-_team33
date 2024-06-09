import { IUser, UserRequestBody } from "../user.type"

import { IError } from "../../main.type"
import UserModel from "./user.model"

export interface IUserHandler {
  createUser: (user: UserRequestBody) => Promise<IUser>
  getUserByEmail: (email: string) => Promise<IUser>
  getUserById: (userId: string) => Promise<IUser>
}

class UserHandler implements IUserHandler {
  async createUser(user: UserRequestBody) {
    const email = user.email
    const existedUser = await UserModel.findOne({ email })
    if (existedUser) {
      const error: IError = new Error("User existed")
      error.status = 400
      throw error
    }
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser
  }

  async getUserById(userId: string): Promise<IUser> {
    const user: IUser | null = (await UserModel.findById(userId))?.lean()
    if (!user) {
      const error: IError = new Error("User not found")
      error.status = 404
      throw error
    }
    return user
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user: IUser | null = await UserModel.findOne({ email })?.lean()
    if (!user) {
      const error: IError = new Error("User not found")
      error.status = 404
      throw error
    }
    return user
  }
}

const userHandler = new UserHandler()

export default userHandler

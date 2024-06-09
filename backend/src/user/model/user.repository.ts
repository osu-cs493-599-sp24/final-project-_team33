import { IUser, UserRequestBody } from "../user.type"

import { IError } from "../../main.type"
import UserModel from "./user.model"

export default class UserRepositor {
  static async createUser(user: UserRequestBody) {
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

  static async getUserByEmail(email: string): Promise<IUser> {
    const user: IUser | null = await UserModel.findOne({ email })
    if (!user) {
      const error: IError = new Error("User not found")
      error.status = 404
      throw error
    }
    return user
  }
}

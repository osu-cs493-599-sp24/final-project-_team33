import { IUser, UserRequestBody } from "../user.type"
import { ObjectIdValidater, comparePassword, hashPassword } from "../../lib/helper"

import UserModel from "./user.model"
import { createError } from "../../lib/helper"

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
      throw createError("User existed", 400)
    }
    const newUser = new UserModel({
      ...user,
      password: hashPassword(user.password),
    })
    await newUser.save()
    return newUser
  }
  async getUserById(userId: string): Promise<IUser> {
    if (!ObjectIdValidater(userId)) {
      throw createError("Invalid user id", 400)
    }
    const user: IUser | null = await UserModel.findById(userId)?.lean()
    if (!user) {
      throw createError("User not found", 404)
    }
    return user
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user: IUser | null = await UserModel.findOne({ email })?.lean()
    if (!user) {
      throw createError("User not found", 404)
    }
    return user
  }

  validatePassword(user: IUser, password: string): void {
    const comparedResult = comparePassword(password, user.password)
    if (!comparedResult) {
      throw createError("Password not match", 400)
    }
  }
}

const userHandler = new UserHandler()

export default userHandler

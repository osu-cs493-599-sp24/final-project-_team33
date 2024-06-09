import { IUser, UserRequestBody } from "./user.type"
import type { NextFunction, Request, Response } from "express"
import UserRepository, { IUserRepository } from "./model/user.repository"

export interface Repositories {
  userHandler: IUserRepository
}

class UserController {
  private _userHandler: IUserRepository
  constructor({ userHandler }: Repositories) {
    this._userHandler = userHandler
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    const body: UserRequestBody = req.body
    const newUser: IUser = await this._userHandler.createUser(body)
    res.status(201).json({ message: "Create User", data: newUser })
  }

  login(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Login" })
  }

  getMe(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get Me" })
  }

  getUser(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get User" })
  }
}

export const userController = new UserController({ userHandler: UserRepository })

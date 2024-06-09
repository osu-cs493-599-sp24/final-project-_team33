import { IUser, UserRequestBody } from "./user.type"
import type { NextFunction, Request, Response } from "express"

import userHandler from "./model/user.handler"

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const body: UserRequestBody = req.body
    const newUser: IUser = await userHandler.createUser(body)
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

export const userController = new UserController()

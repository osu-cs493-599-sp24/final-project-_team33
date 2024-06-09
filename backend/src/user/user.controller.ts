import { IUser, UserLoginBody, UserRequestBody } from "./user.type"
import type { NextFunction, Request, Response } from "express"

import { IError } from "../main.type"
import { createToken } from "../lib/helper"
import userHandler from "./model/user.handler"

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UserRequestBody = req.body
      const newUser: IUser = await userHandler.createUser(body)
      res.status(201).json({ message: "Create User", data: newUser })
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUser: UserLoginBody = req.body
      const user = await userHandler.getUserByEmail(loginUser.email)
      // generate access token
      const token = createToken(user)

      res.json({ message: "Login.", data: { ...user, accessToken: token } })
    } catch (error) {
      next(error)
    }
  }

  getMe(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get Me" })
  }

  getUser(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get User" })
  }
}

export const userController = new UserController()

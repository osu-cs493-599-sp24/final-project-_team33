import { IUser, UserLoginBody, UserRequestBody } from "./user.type"
import type { NextFunction, Request, Response } from "express"

import { IError } from "../main.type"
import _ from "lodash"
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
      const user: IUser = await userHandler.getUserByEmail(loginUser.email)
      // validate password
      userHandler.validatePassword(user, loginUser.password)

      // generate access token
      const token = createToken(user)
      const data = { ..._.omit(user, ["password", "__v"]), accessToken: token }

      res.json({ message: "Login.", data })
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

import type { NextFunction, Request, Response } from "express"

class UserController {
  createUser(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Create User" })
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

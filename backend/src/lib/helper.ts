import type { NextFunction, Request, Response } from "express"

import { IError } from "../main.type"
import { IUser } from "../user/user.type"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const SECRET = process.env.JWT_SECRET || "TEAM33_SECRET"

export const createToken = (user: IUser) => jwt.sign({ user }, SECRET, { expiresIn: "10d" })

export const verifyToken = (token: string) => jwt.verify(token, SECRET)

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const combineMiddlewares =
  (middleWares: any) => (req: Request, res: Response, next: NextFunction) => {
    const handler = middleWares.reduceRight(
      (nextMiddleware: any, currentMiddleware: any) => (err: any) => {
        if (err) {
          return next(err)
        }
        try {
          currentMiddleware(req, res, nextMiddleware)
        } catch (error) {
          next(error)
        }
      },
      next
    )
    handler()
  }

export const ObjectIdValidater = (id: string) => mongoose.Types.ObjectId.isValid(id)

export const createError = (message: string, status: number): IError => {
  const error: IError = new Error(message)
  error.status = status
  return error
}

import type { NextFunction, Request, Response } from "express"

import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "TEAM33_SECRET"

export const createToken = (user: any) => jwt.sign({ user }, SECRET, { expiresIn: "10d" })

export const verifyToken = (token: string) => jwt.verify(token, SECRET)

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

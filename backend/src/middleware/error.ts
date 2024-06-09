import { NextFunction, Request, Response } from "express"

import { IError } from "../main.type"

export default function errorMiddileware(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
    error: err,
  })
}

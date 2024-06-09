import Joi, { ValidationError, ValidationResult } from "joi"
import type { NextFunction, Request, Response } from "express"

export const bodyValidation =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const result: ValidationResult = schema.validate(req.body, { abortEarly: false })
    if (result.error) {
      return res.status(422).json({
        message: "Invalid request data",
        errors: result.error.details.map(err => err.message),
      })
    }

    // no error go to next middleware
    next()
  }

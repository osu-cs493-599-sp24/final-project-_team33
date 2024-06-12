import { ISubmission, SubmissionRequestBody } from "./submission.type"
import type { NextFunction, Request, Response } from "express"

import { error } from "console"
import submissionHandler from "./model/submission.handler"

class SubmissionController {
  async post(req: Request, res: Response, next: NextFunction) {
  }

  async update(req: any, res: Response, next: NextFunction) {
    try {
      const user = req.user
      const submissionId = req.params.submissionId
      const body: any = req.body
      if (user.role == "instructor") {
        const instructorId = await submissionHandler.findInstructorIdBySubmissionId(submissionId)
        if (user._id != instructorId) {
          throw new Error("You are not authorized to update this submission")
        }
      }
      const submission = (await submissionHandler.updateSubmission(submissionId, body)) || {}
      res.status(200).json({ message: "Submission updated successfully.", submission })
    } catch (error) {
      next(error)
    }
  }

  async getSubInfo(req: Request, res: Response, next: NextFunction) {
  }
}

export const submissionController = new SubmissionController()

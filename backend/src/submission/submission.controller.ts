import { ISubmission, SubmissionRequestBody } from "./submission.type"
import type { NextFunction, Request, Response } from "express"

import { error } from "console"
import submissionHandler from "./model/submission.handler"

class SubmissionController {
  async post(req: Request, res: Response, next: NextFunction) {
    // console.log("====submission post=====")
    // try {
    //   //const body: SubmissionRequestBody = req.body
    //   const body: any = req.body
    //   console.log(body)
    //   //console.log(req.file)
    //   const SubInfo: any = await submissionHandler.addSubInfoById(body)
    //   res.status(200).send({ id: SubInfo })
    // } catch (error: any) {
    //   next(error)
    // }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const submissionId = req.params.submissionId
      const body: ISubmission = req.body
      //   const submission = await submissionHandler.updateSubInfoById(submissionId, body)
      const submission = {}
      res.status(200).json(submission)
    } catch (error) {
      next(error)
    }
  }

  async getSubInfo(req: Request, res: Response, next: NextFunction) {
    //     console.log("====getSubInfo post=====")
    //     try {
    //       const submission = await submissionHandler.getSubInfoById(req.body.assignmentId)
    //       if (submission) {
    //         submission.url = `/submission/upload/submission/${submission.filename}`
    //         res.status(200).send(submission)
    //       }
    //     } catch (error) {
    //       next(error)
    //     }
    //   }
  }
}

export const submissionController = new SubmissionController()

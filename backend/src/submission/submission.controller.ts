import multer from "multer";
import crypto from "crypto";
import { ISubmission, SubmissionRequestBody} from "./submission.type"
import { error } from "console"
import type { NextFunction, Request, Response } from "express"
import submissionHandler from "./model/submission.handler"


class SubmissionController {
    
    async post(req: Request, res: Response, next: NextFunction) {
        console.log("====submission post=====")
      try{
        //const body: SubmissionRequestBody = req.body
        const body: any = req.body
        console.log(body)
        //console.log(req.file)
        const SubInfo: any = await submissionHandler.addSubInfoById(body)
        res.status(200).send({ id: SubInfo })
      } catch (error: any) {
        next(error)
      }
    }

    async getSubInfo(req: Request, res: Response, next: NextFunction) {
        console.log("====getSubInfo post=====")
        try {
            const submission = await submissionHandler.getSubInfoById(req.body.assignmentId)
            if(submission) {
                submission.url = `/submission/upload/submission/${submission.filename}`
                res.status(200).send(submission)
            }
        } catch (error) {
            next(error)
        }
    }









}


export const submissionController = new SubmissionController()
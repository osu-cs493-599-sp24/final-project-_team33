import type { NextFunction, Request, Response } from "express"

import SubmissionModel from "../submission/model/submission.model"
import { error } from "console"
import { getFileById } from "../lib/upload"

// import submissionHandler from "."

class MediaController {
  async getFile(req: Request, res: Response, next: NextFunction) {
    const fileName = req.params.fileName
    console.log(fileName)
    const submission = await SubmissionModel.findOne({ "file.filename": fileName })
    if (!submission) {
      res.status(404).json({ message: "File not found" })
      return
    }
    const fileId = submission.fileId
    const file = await getFileById(fileId)
    res.send(file)
  }
}

export const mediaController = new MediaController()

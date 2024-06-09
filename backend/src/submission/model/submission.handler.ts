import { ISubmission, SubmissionRequestBody } from "../submission.type"

import { IError } from "../../main.type"
import SubmissionModel from "./submission.model"

export interface ISubmissionHandler {
  getSubmissionById: (submissionId: string) => Promise<ISubmission>
  addSubmission: (submission: SubmissionRequestBody) => Promise<ISubmission>
  updateSubmission: (submissionId: string, submission: ISubmission) => Promise<ISubmission>
  getSubmissionMedia: (submissionId: string) => Promise<string[]>
}

class SubmissionHandler implements ISubmissionHandler {
  async getSubmissionById(submissionId: string): Promise<ISubmission> {
    return {} as ISubmission
  }

  async addSubmission(submission: SubmissionRequestBody): Promise<ISubmission> {
    return {} as ISubmission
  }

  async updateSubmission(submissionId: string, submission: ISubmission): Promise<ISubmission> {
    return {} as ISubmission
  }

  async getSubmissionMedia(submissionId: string): Promise<string[]> {
    return []
  }
}

const submissionHandler = new SubmissionHandler()

export default submissionHandler

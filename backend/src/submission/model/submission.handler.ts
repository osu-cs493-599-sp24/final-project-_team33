import { ISubmission, SubmissionRequestBody } from "../submission.type"
import mongoose, { isValidObjectId } from "mongoose"
import { IError } from "../../main.type"
import SubmissionModel from "./submission.model"

const ObjectId = mongoose.Schema.Types.ObjectId
export interface ISubmissionHandler {
  getSubInfoById: (submissionId: string) => Promise<any>
  addSubInfoById: (submissionId: string) => Promise<any>
  updateSubInfo: (submissionId: string, updateData: Partial<any>) => Promise<any>
}

class SubmissionHandler implements ISubmissionHandler {

  async getSubInfoById(submissionId: any): Promise<any> {
    if (!isValidObjectId(submissionId)) {
        return null
    } else {
      const submission = await SubmissionModel.findById(submissionId);
        return submission
    }
  }
  //saveImageInfo
  async addSubInfoById(submission: any): Promise<ISubmission> {
    const newSubmission = new SubmissionModel(submission);
    await newSubmission.save();
    return newSubmission.toObject();
  }

  async updateSubInfo(submissionId: string, updateData: Partial<ISubmission>): Promise<any> {
    if (!isValidObjectId(submissionId)) {
        return null;
    } else {
      const result = await SubmissionModel.updateOne(
        { _id: new mongoose.Types.ObjectId(submissionId) },
        { $set: updateData }
      );
      return result.matchedCount > 0;
    }
  }

}


const submissionHandler = new SubmissionHandler()

export default submissionHandler

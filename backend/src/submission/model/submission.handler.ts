import { ISubmission, SubmissionRequestBody } from "../submission.type"

import { IError } from "../../main.type"
import SubmissionModel from "./submission.model"
import mongoose from 'mongoose';

export interface ISubmissionHandler {
  addSubmission: (submission: SubmissionRequestBody) => Promise<ISubmission>;
  updateSubmission: (submissionId: string, submission: Partial<ISubmission>) => Promise<ISubmission | null>;
  getSubmissionMedia: (submissionId: string) => Promise<string>;
  getSubmissionsByAssignmentId: (assignmentId: string, page: number, studentId?: string) => Promise<ISubmission[]>;
}

class SubmissionHandler implements ISubmissionHandler {
  async addSubmission(submission: SubmissionRequestBody): Promise<ISubmission> {
    const newSubmission = new SubmissionModel({
      ...submission,
      assignmentId: new mongoose.Types.ObjectId(submission.assignmentId),
      studentId: new mongoose.Types.ObjectId(submission.studentId),
    });
    await newSubmission.save();
    return newSubmission.toObject();
  }

  async updateSubmission(submissionId: string, submission: Partial<ISubmission>): Promise<ISubmission | null> {
    if (submission.assignmentId) {
      submission.assignmentId = new mongoose.Types.ObjectId(submission.assignmentId);
    }
    if (submission.studentId) {
      submission.studentId = new mongoose.Types.ObjectId(submission.studentId);
    }
    const updatedSubmission = await SubmissionModel.findByIdAndUpdate(submissionId, submission, { new: true }).exec();
    return updatedSubmission ? updatedSubmission.toObject() : null;
  }

  async getSubmissionMedia(submissionId: string): Promise<string> {
    const submission = await SubmissionModel.findById(submissionId).exec();
    if (!submission) {
      throw new Error('Submission not found');
    }
    return submission.file;
  }

  async getSubmissionsByAssignmentId(assignmentId: string, page: number, studentId?: string): Promise<ISubmission[]> {
    const query: any = { assignmentId: new mongoose.Types.ObjectId(assignmentId) };
    if (studentId) {
      query.studentId = new mongoose.Types.ObjectId(studentId);
    }
    const submissions = await SubmissionModel.find(query)
      .skip((page - 1) * 10)
      .limit(10)
      .exec();
    return submissions.map(submission => submission.toObject());
  }
}

const submissionHandler = new SubmissionHandler();
export default submissionHandler;

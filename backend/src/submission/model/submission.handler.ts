import { ISubmission, SubmissionRequestBody } from "../submission.type"
import mongoose, { isValidObjectId } from "mongoose"

import AssignmentModel from "../../assignment/model/assignment.model"
import CourseModel from "../../course/model/course.model"
import { IError } from "../../main.type"
import SubmissionModel from "./submission.model"

const ObjectId = mongoose.Schema.Types.ObjectId
export interface ISubmissionHandler {
  addSubmission: (submission: SubmissionRequestBody) => Promise<ISubmission>
  updateSubmission: (submissionId: any, body: any) => any
  getSubmissionMedia: (submissionId: string) => Promise<string>
  getSubmissionsByAssignmentId: (
    assignmentId: string,
    page: number,
    studentId?: string
  ) => Promise<ISubmission[]>
  findInstructorIdBySubmissionId(submissionId: string): Promise<any>
}

class SubmissionHandler implements ISubmissionHandler {
  async addSubmission(submission: SubmissionRequestBody): Promise<ISubmission> {
    const newSubmission = new SubmissionModel({
      ...submission,
      // assignmentId: new mongoose.Types.ObjectId(submission.assignmentId),
      // studentId: new mongoose.Types.ObjectId(submission.studentId),
    })
    await newSubmission.save()
    return newSubmission.toObject()
  }

  async updateSubmission(submissionId: any, body: any) {
    const updatedSubmission = await SubmissionModel.findByIdAndUpdate(
      submissionId,
      { $set: body },
      { new: true }
    ).exec()
    return updatedSubmission ? updatedSubmission.toObject() : null
  }

  async getSubmissionMedia(submissionId: string): Promise<string> {
    const submission = await SubmissionModel.findById(submissionId).exec()
    if (!submission) {
      throw new Error("Submission not found")
    }
    return submission.file
  }

  async getSubmissionsByAssignmentId(
    assignmentId: string,
    page: number,
    studentId?: string
  ): Promise<ISubmission[]> {
    const query: any = { assignmentId: new mongoose.Types.ObjectId(assignmentId) }
    if (studentId) {
      query.studentId = new mongoose.Types.ObjectId(studentId)
    }
    const submissions = await SubmissionModel.find(query)
      .skip((page - 1) * 10)
      .limit(10)
      .exec()
    return submissions.map(submission => submission.toObject())
  }

  async findInstructorIdBySubmissionId(submissionId: string): Promise<any> {
    const submission = await SubmissionModel.findById(submissionId)
    const assignmentId = submission.assignmentId
    const asm: any = await AssignmentModel.findOne({ _id: assignmentId })
    const course = await CourseModel.findOne({ assignments: asm._id }).exec()
    const instructorId = course.instructorId
    return instructorId
  }
}

const submissionHandler = new SubmissionHandler()
export default submissionHandler

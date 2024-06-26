// handlers/assignmentHandler.ts
import { AssignmentRequestBody, IAssignment } from "../assignment.type"
import { ISubmission, SubmissionRequestBody } from "../../submission/submission.type"

import AssignmentModel from "./assignment.model"
import CourseModel from "../../course/model/course.model"
import SubmissionModel from "../../submission/model/submission.model"
import mongoose from "mongoose"
import submissionHandler from "../../submission/model/submission.handler"

const ObjectId = mongoose.Types.ObjectId

export interface IAssignmentHandler {
  addAssignment: (assignment: AssignmentRequestBody) => Promise<IAssignment>
  getAssignmentById: (assignmentId: string) => Promise<IAssignment | null>
  updateAssignmentById: (
    assignmentId: string,
    assignment: Partial<IAssignment>
  ) => Promise<IAssignment | null>
  deleteAssignmentById: (assignmentId: string) => Promise<void>
  getSubmissionsByAssignmentId: (
    assignmentId: string,
    page: number,
    studentId?: string
  ) => Promise<ISubmission[]>
  addSubmission: (body: any) => any
}

class AssignmentHandler implements IAssignmentHandler {
  async addSubmission(body: any): any {
    const submission = new SubmissionModel(body)
    await submission.save()
    return submission.toObject()
  }
  async addAssignment(assignment: AssignmentRequestBody): Promise<IAssignment> {
    const newAssignment = new AssignmentModel(assignment)
    await newAssignment.save()
    const returnValue = newAssignment.toObject()
    //
    const course: any = await CourseModel.findOne({ courseId: assignment.courseId }).lean()
    if (!course) {
      throw new Error("Course not found")
    }
    // update course.assignments with newAssignment._id
    await CourseModel.findByIdAndUpdate(course._id, {
      $addToSet: { assignments: newAssignment._id },
    }).exec()
    return returnValue
  }

  async getAssignmentById(assignmentId: string): Promise<IAssignment | null> {
    return AssignmentModel.findById(assignmentId).exec()
  }

  async getCourseByAssignmentId(assignmentId: string): Promise<any> {
    const course: any = await CourseModel.findOne({ assignments: assignmentId }).lean()
    if (!course) {
      throw new Error("Course not found")
    }
    return course
  }

  async updateAssignmentById(
    assignmentId: string,
    assignment: Partial<IAssignment>
  ): Promise<IAssignment | null> {
    // find the assignment by ID
    return AssignmentModel.findByIdAndUpdate(assignmentId, assignment, { new: true }).exec()
  }

  async deleteAssignmentById(assignmentId: string): Promise<void> {
    const course = await this.getCourseByAssignmentId(assignmentId)
    await CourseModel.findByIdAndUpdate(course._id, {
      $pull: { assignments: new ObjectId(assignmentId) },
    }).exec()

    await AssignmentModel.findByIdAndDelete(assignmentId).exec()
  }

  async getSubmissionsByAssignmentId(
    assignmentId: string,
    page: number,
    studentId?: string
  ): Promise<ISubmission[]> {
    return submissionHandler.getSubmissionsByAssignmentId(assignmentId, page, studentId)
  }
}

const assignmentHandler = new AssignmentHandler()
export default assignmentHandler

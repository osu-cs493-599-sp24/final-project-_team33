import { AssignmentRequestBody, IAssignment } from "../assignment.type"

import AssignmentModel from "./assignment.model"
import { IError } from "../../main.type"

export interface IAssignmentHandler {
  addAssignment: (assignment: AssignmentRequestBody) => Promise<IAssignment>
  getAssignmentById: (assignmentId: string) => Promise<IAssignment>
  updateAssignmentById: (assignmentId: string, assignment: IAssignment) => Promise<IAssignment>
  deleteAssignmentById: (assignmentId: string) => Promise<void>
  getSubmissionsByAssignmentId: (assignmentId: string) => Promise<string[]>
  addSubmissionByAssignmentId: (assignmentId: string, submissionId: string) => Promise<void>
}

class AssignmentHandler implements IAssignmentHandler {
  async addAssignment(assignment: AssignmentRequestBody): Promise<IAssignment> {
    const newAssignment = new AssignmentModel(assignment)
    await newAssignment.save()
    return newAssignment
  }

  async getAssignmentById(assignmentId: string): Promise<IAssignment> {
    return {} as IAssignment
  }

  async updateAssignmentById(assignmentId: string, assignment: IAssignment): Promise<IAssignment> {
    return {} as IAssignment
  }

  async deleteAssignmentById(assignmentId: string): Promise<void> {}

  async getSubmissionsByAssignmentId(assignmentId: string): Promise<string[]> {
    return []
  }

  async addSubmissionByAssignmentId(assignmentId: string, submissionId: string): Promise<void> {}
}

const assignmentHandler = new AssignmentHandler()

export default assignmentHandler

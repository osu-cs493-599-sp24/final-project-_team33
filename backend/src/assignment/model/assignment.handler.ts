// handlers/assignmentHandler.ts
import { AssignmentRequestBody, IAssignment } from "../assignment.type"
import { SubmissionRequestBody, ISubmission } from "../../submission/submission.type"
import AssignmentModel from "./assignment.model"
import submissionHandler from '../../submission/model/submission.handler'

export interface IAssignmentHandler {
  addAssignment: (assignment: AssignmentRequestBody) => Promise<IAssignment>
  getAssignmentById: (assignmentId: string) => Promise<IAssignment | null>
  updateAssignmentById: (assignmentId: string, assignment: Partial<IAssignment>) => Promise<IAssignment | null>
  deleteAssignmentById: (assignmentId: string) => Promise<void>
  getSubmissionsByAssignmentId: (assignmentId: string, page: number, studentId?: string) => Promise<ISubmission[]>
  addSubmissionByAssignmentId: (assignmentId: string, submission: SubmissionRequestBody) => Promise<ISubmission>
}

class AssignmentHandler implements IAssignmentHandler {
  async addAssignment(assignment: AssignmentRequestBody): Promise<IAssignment> {
    const newAssignment = new AssignmentModel(assignment);
    await newAssignment.save();
    return newAssignment.toObject();
  }

  async getAssignmentById(assignmentId: string): Promise<IAssignment | null> {
    return AssignmentModel.findById(assignmentId).exec();
  }

  async updateAssignmentById(assignmentId: string, assignment: Partial<IAssignment>): Promise<IAssignment | null> {
    return AssignmentModel.findByIdAndUpdate(assignmentId, assignment, { new: true }).exec();
  }

  async deleteAssignmentById(assignmentId: string): Promise<void> {
    await AssignmentModel.findByIdAndDelete(assignmentId).exec();
  }

  async getSubmissionsByAssignmentId(assignmentId: string, page: number, studentId?: string): Promise<ISubmission[]> {
    return submissionHandler.getSubmissionsByAssignmentId(assignmentId, page, studentId);
  }

  async addSubmissionByAssignmentId(assignmentId: string, submission: SubmissionRequestBody): Promise<ISubmission> {
    submission.assignmentId = assignmentId;
    return submissionHandler.addSubmission(submission);
  }
}

const assignmentHandler = new AssignmentHandler();
export default assignmentHandler;

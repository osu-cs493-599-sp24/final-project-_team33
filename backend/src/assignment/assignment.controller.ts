import {} from "../lib/upload"

import { AssignmentRequestBody, IAssignment } from "./assignment.type"
// controllers/assignmentController.ts
import { Request, Response } from "express"

import { SubmissionRequestBody } from "../submission/submission.type"
import assignmentHandler from "./model/assignment.handler"
import { uploadFile } from "../lib/upload"

class AssignmentController {
  async createAssignment(req: any, res: Response) {
    try {
      const user = req.user
      const newBody = {
        ...req.body,
        due: new Date(req.body.due),
      }
      const assignment = await assignmentHandler.addAssignment(req.body)
      res.status(201).json({ id: assignment._id })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: "Invalid assignment data" })
    }
  }

  async getAssignmentById(req: Request<{ id: string }>, res: Response) {
    try {
      const assignment = await assignmentHandler.getAssignmentById(req.params.id)
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" })
      }
      res.status(200).json(assignment)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async updateAssignmentById(req: any, res: Response) {
    try {
      const course = await assignmentHandler.getCourseByAssignmentId(req.params.id)
      const instructorId: any = course.instructorId
      const user = req.user
      if (!instructorId.equals(user._id)) {
        throw new Error("Unauthorized access")
      }
      const assignment = await assignmentHandler.updateAssignmentById(req.params.id, req.body)
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" })
      }
      res.status(200).json(assignment)
    } catch (error) {
      res.status(400).json({ error: "Invalid assignment data" })
    }
  }

  async deleteAssignmentById(req: Request<{ id: string }>, res: Response) {
    try {
      await assignmentHandler.deleteAssignmentById(req.params.id)
      res.status(204).json({
        message: "Assignment deleted successfully.",
      })
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }

  // Submission-related methods
  async getSubmissionsByAssignmentId(
    req: Request<{ id: string }, {}, {}, { page: string; studentId: string }>,
    res: Response
  ) {
    try {
      const { page = "1", studentId } = req.query
      const submissions = await assignmentHandler.getSubmissionsByAssignmentId(
        req.params.id,
        Number(page),
        studentId
      )
      res.status(200).json({ submissions })
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async createSubmission(req: any, res: Response, next: any) {
    try {
      const assignmentId = req.params.id
      const user = req.user
      const studentId = user._id

      console.log("req.file", req.file)
      const file = req.file
      const { path, filename } = file
      const fileId = await uploadFile({
        fileName: filename,
        filePath: path,
        bucketName: "submissionFile",
      })

      const body: any = {
        assignmentId: assignmentId,
        studentId: studentId,
        timestamp: new Date(),
        grade: 0,
      }

      if (file) {
        body.file = file
        body.fileId = fileId
      }
      const submission: any = await assignmentHandler.addSubmission(body)

      //   res.status(201).json({ id: submission._id })
      res.status(201).json({ message: "Submission created successfully", data: submission })
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" })
    }
  }
}

export const assignmentController = new AssignmentController()

// controllers/assignmentController.ts
import { Request, Response } from 'express'
import { IAssignment, AssignmentRequestBody } from './assignment.type'
import assignmentHandler from "./model/assignment.handler"
import { SubmissionRequestBody } from '../submission/submission.type';

class AssignmentController {
  async createAssignment(req: Request<{}, {}, AssignmentRequestBody>, res: Response) {
    try {
      const assignment = await assignmentHandler.addAssignment(req.body);
      res.status(201).json({ id: assignment._id });
    } catch (error) {
      res.status(400).json({ error: 'Invalid assignment data' });
    }
  }

  async getAssignmentById(req: Request<{ id: string }>, res: Response) {
    try {
      const assignment = await assignmentHandler.getAssignmentById(req.params.id);
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateAssignmentById(req: Request<{ id: string }, {}, Partial<IAssignment>>, res: Response) {
    try {
      const assignment = await assignmentHandler.updateAssignmentById(req.params.id, req.body);
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      res.status(200).json(assignment);
    } catch (error) {
      res.status(400).json({ error: 'Invalid assignment data' });
    }
  }

  async deleteAssignmentById(req: Request<{ id: string }>, res: Response) {
    try {
      await assignmentHandler.deleteAssignmentById(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Submission-related methods
  async getSubmissionsByAssignmentId(req: Request<{ id: string }, {}, {}, { page: string, studentId: string }>, res: Response) {
    try {
      const { page = '1', studentId } = req.query;
      const submissions = await assignmentHandler.getSubmissionsByAssignmentId(req.params.id, Number(page), studentId);
      res.status(200).json({ submissions });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createSubmission(req: Request<{ id: string }, {}, SubmissionRequestBody>, res: Response) {
    try {
      const submission = await assignmentHandler.addSubmissionByAssignmentId(req.params.id, req.body);
      res.status(201).json({ id: submission._id });
    } catch (error) {
      res.status(400).json({ error: 'Invalid submission data' });
    }
  }
}

export const assignmentController = new AssignmentController();

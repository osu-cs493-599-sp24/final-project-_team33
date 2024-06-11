import type { Router } from "express"
import express from "express"
import { assignmentController } from './assignment.controller'

const router: Router = express.Router()

router.post('/assignments', assignmentController.createAssignment);
router.get('/assignments/:id', assignmentController.getAssignmentById);
router.patch('/assignments/:id', assignmentController.updateAssignmentById);
router.delete('/assignments/:id', assignmentController.deleteAssignmentById);

// Submission routes
router.get('/assignments/:id/submissions', assignmentController.getSubmissionsByAssignmentId);
router.post('/assignments/:id/submissions', assignmentController.createSubmission);

export default router


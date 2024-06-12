import type { Router } from "express"
import express from "express"
import { assignmentController } from './assignment.controller'

const router: Router = express.Router()

router.post('/', assignmentController.createAssignment);
router.get('/:id', assignmentController.getAssignmentById);
router.patch('/:id', assignmentController.updateAssignmentById);
router.delete('/:id', assignmentController.deleteAssignmentById);

//Submission routes
router.get('/:id/submissions', assignmentController.getSubmissionsByAssignmentId);
router.post('/:id/submissions', assignmentController.createSubmission);

export default router


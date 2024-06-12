import type { Router } from "express"
import express from "express"
import { submissionController } from './submission.controller'

const router: Router = express.Router()

router.patch('/:id', submissionController.updateSubmission);
router.get('/:id/media', submissionController.getSubmissionMedia);

export default router


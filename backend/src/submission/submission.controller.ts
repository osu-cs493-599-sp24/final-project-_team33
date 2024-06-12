import { Request, Response } from 'express'
import submissionHandler from './model/submission.handler'
import { ISubmission, SubmissionRequestBody } from './submission.type'

class SubmissionController {
    async updateSubmission(req: Request<{ id: string }, {}, Partial<ISubmission>>, res: Response) {
        try {
            const submission = await submissionHandler.updateSubmission(req.params.id, req.body);
            if (!submission) {
                return res.status(404).json({ error: 'Submission not found' });
            }
            res.status(200).json(submission);
        } catch (error) {
            res.status(400).json({ error: 'Invalid submission data' });
        }
    }

    async getSubmissionMedia(req: Request<{ id: string }>, res: Response) {
        try {
            const file = await submissionHandler.getSubmissionMedia(req.params.id);
            res.status(200).json({ file });
        } catch (error) {
            res.status(404).json({ error: 'Submission not found' });
        }
    }
}

export const submissionController = new SubmissionController();

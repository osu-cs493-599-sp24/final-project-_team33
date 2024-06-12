import type { Router } from "express"
import express from "express"
import { submissionController } from "./submission.controller"
// import { upload } from "./model/submission.model"

const router: Router = express.Router()

router.patch("/:submissionId", submissionController.update)
// router.get('/:id/media', submissionController.getSubmissionMedia);

router.get("/:id", submissionController.getSubInfo)
// router.get("/media/:filename",() => {} )

export default router

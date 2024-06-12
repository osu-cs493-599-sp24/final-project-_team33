import type { Router } from "express"
import { authMiddleWare } from "../middleware/auth"
import express from "express"
import { submissionController } from "./submission.controller"

const router: Router = express.Router()

router.patch("/:submissionId", authMiddleWare(["instructor", "admin"]), submissionController.update)
// router.get('/:id/media', submissionController.getSubmissionMedia);

// router.get("/:id", submissionController.getSubInfo)
// router.get("/media/:filename",() => {} )

export default router

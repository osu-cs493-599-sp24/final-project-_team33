import type { Router } from "express"
import { authMiddleWare } from "../middleware/auth"
import express from "express"
import { mediaController } from "./media.controller"

const router: Router = express.Router()

router.get("/submissions/:fileName", authMiddleWare(["instructor", "admin"]), mediaController.getFile)

export default router

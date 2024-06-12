import { authMiddleWare, getExactRole } from "../middleware/auth"

import type { Router } from "express"
import express from "express"
import { userController } from "./user.controller"

const router: Router = express.Router()

router.get("/", authMiddleWare(["student", "instructor", "admin"]), userController.getMe)
router.post("/", userController.createUser)
router.post("/login", userController.login)
router.get(
  "/:userId",
  authMiddleWare(["student", "instructor", "admin"]),
  getExactRole,
  userController.getUser
)

export default router

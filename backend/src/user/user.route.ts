import { authMiddleWare, getExactRole } from "../middleware/auth"
import { rateLimitAuth, rateLimitUnAuth } from "../middleware/ratelimiter"

import type { Router } from "express"
import express from "express"
import { userController } from "./user.controller"

const router: Router = express.Router()

router.get(
  "/",
  authMiddleWare(["student", "instructor", "admin"]),
  rateLimitAuth,
  userController.getMe
)
router.post("/", rateLimitUnAuth, userController.createUser)
router.post("/login", rateLimitUnAuth, userController.login)
router.get(
  "/:userId",
  authMiddleWare(["student", "instructor", "admin"]),
  rateLimitAuth,
  getExactRole,
  userController.getUser
)

export default router

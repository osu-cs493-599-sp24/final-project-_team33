import type { Router } from "express"
import express from "express"
import { userController } from "./user.controller"

const router: Router = express.Router()

router.get("/", userController.getMe)
router.post("/", userController.createUser)
router.post("/login", userController.login)
router.get("/:userId", userController.getUser)


export default router

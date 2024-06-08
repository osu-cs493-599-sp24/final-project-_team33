import type { Router } from "express"
import express from "express"
import { userController } from "./user.controller"

const router: Router = express.Router()

router.post("/", userController.createUser)
router.get("/", userController.getMe)
router.post("/login", userController.login)
router.get("/:userId", userController.getUser)


export default router

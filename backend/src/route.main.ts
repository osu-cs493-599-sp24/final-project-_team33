import type { Router } from "express"
// import businessRouter from "./business/business.route"
import express from "express"
import userRouter from "./user/user.route"
import submissionRouter from "./submission/submission.route"
import path from 'path';


const router: Router = express.Router()
//const dirpath = `src/submission`;
//const dirname = path.join(__dirname, 'src/submission');

router.use("/users", userRouter)
router.use("/submission", submissionRouter)
router.use("/media/submission", express.static(path.join('src/submission/uploads'))) //download
router.use("/", express.static(path.join('src/submission/uploads')))






export default router

import express from 'express'
const router = express.Router()
import {
    demo,
    getStudentData
} from "../controllers/adminController.js"

router.get('/demo', demo)
router.get('/getStudentData', getStudentData)

export default router

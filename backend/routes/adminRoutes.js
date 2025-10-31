import express from 'express'
const router = express.Router()
import {
    demo
} from "../controllers/adminController.js"

router.get('/demo', demo)

export default router

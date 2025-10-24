import express from 'express'
const router = express.Router()
import {
    demo
} from "../controllers/adminControllers.js"

router.get('/demo', demo)

export default router

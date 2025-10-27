import express from 'express'
const router = express.Router()
import {
    demo
} from "../controllers/studentControllers.js"

router.get('/demo', demo)

export default router


import express from 'express'
const router = express.Router()
import upload from '../middleware/multerConfig.js'
import {demo, uploadFile, newAdmission} from "../controllers/studentController.js"

// router.get('/demo', demo)

router.post('/admission', upload.single("image"),newAdmission)


export default router


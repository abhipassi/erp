import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"

import adminRoutes from './routes/adminRoutes.js'
import studentControllersRoutes from './routes/studentRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/admin",adminRoutes)
app.use("/api/student",adminRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{
    console.log("Server is live");
})
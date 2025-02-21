import express from 'express'
import dbconnection from './db/index.js'
import dotenv from 'dotenv'
import cors from 'cors'
// import Expresssession from 'express-session'
import cookieparser from 'cookie-parser'
const app = express()
dotenv.config()
dbconnection()
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieparser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

import userRouter from './routers/onsko.routers.js'

app.use("/api/v1/onsko", userRouter)



app.listen(process.env.PORT)
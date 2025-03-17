import express from 'express'
import dbconnection from './db/index.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from "path"
// import Expresssession from 'express-session'
import cookieparser from 'cookie-parser'
const app = express()
const __dirname = path.resolve()
dotenv.config()
dbconnection()
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieparser())
app.use(express.static(path.join(__dirname,"/Frontend/dist")))

app.use(cors({
    origin: "https://e-commerce-project-1-3om1.onrender.com",
    credentials: true
}));

import userRouter from './routers/onsko.routers.js'
 
app.use("/api/v1/onsko", userRouter)
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
})


app.listen(process.env.PORT)
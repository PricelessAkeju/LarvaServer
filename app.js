import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import tutorModel from "./MODELS/tutorModel.js";
import studentModel from '../server/MODELS/studentModel.js';
import attendanceModel from "./MODELS/attendanceModel.js";
import tutorRouter from "./ROUTERS/tutorRouter.js";
import studentRouter from "./ROUTERS/studentRouter.js";
import attendanceRouter from "./ROUTERS/attendanceRouter.js";


const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use(tutorRouter)
app.use(studentRouter)
app.use(attendanceRouter)











const port = process.env.PORT

mongoose.connect (process.env.MONGO_URI)
   .then(()=> {
    app.listen(port, ()=> {
        console.log(`server listen on ${port}`)
    })
    console.log("connected to MongoDB")
    })
   .catch(err=> console.error(err))
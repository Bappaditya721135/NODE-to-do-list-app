import express from "express";
import { router as userRouter } from "./routers/userRoutes.js";
import {router as taskRouter} from "./routers/taskRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";


export const app = express()

dotenv.config({
    path: "./config/config.env",
})





// to read json data in request object 

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)

// error handler 
app.use(errorHandler)
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }))

app.use(cors())


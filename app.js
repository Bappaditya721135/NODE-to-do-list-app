import express from "express";
import { router as userRouter } from "./routers/userRoutes.js";
import dotenv from "dotenv";


export const app = express()

dotenv.config({
    path: "./config.env",
})




// to read json data in request object 

app.use(express.json())
app.use("/api/v1/user", userRouter)


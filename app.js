import express from "express";
import { router as userRouter } from "./routers/userRoutes.js";


export const app = express()



// to read json data in request object 
app.use(express.json())
app.use("/api/v1/user", userRouter)


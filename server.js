import express from "express";
import { connectDatabase } from "./database/database.js";
import {app} from "./app.js"


// const app = express()

export const router = express.Router()
app.use(router)

// middlewares 

app.get("/",(req, res) => {
    res.send("this is the / page")
})

app.listen(5000, () => {
    connectDatabase()
    console.log("server is listining");
})
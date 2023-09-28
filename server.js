import express from "express";
import { connectDatabase } from "./database/database.js";
import {app} from "./app.js"




app.get("/",cors(),(req, res) => {
    res.status(200).json({
        success: true,
        message: "this is the node home page"
    })
})

app.listen(process.env.PORT, () => {
    connectDatabase()
    console.log("server is listining");
})
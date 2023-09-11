import express from "express";
import { connectDatabase } from "./database/database.js";
import {app} from "./app.js"




app.get("/",(req, res) => {
    res.send("this is the / page")
})

app.listen(process.env.PORT, () => {
    connectDatabase()
    console.log("server is listining");
})
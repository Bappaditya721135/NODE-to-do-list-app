import mongoose from "mongoose";



export const connectDatabase = () => {
    mongoose.connect("mongodb://127.0.0.1:27017", {dbName: "NODE-to-do-list-app"}).then(() => {
    console.log("database connected")
}).catch(err => {
    console.log(err)
})
}


import mongoose from "mongoose";



export const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {dbName: "NODE-to-do-list-app"}).then(() => {
    console.log("database connected")
}).catch(err => {
    console.log(err)
})
}


import mongoose from "mongoose";



export const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {dbName: "NODE-to-do-list-app"}).then((c) => {
    console.log("database connected")
    console.log(c.connection.name)
}).catch(err => {
    console.log(err)
})
}


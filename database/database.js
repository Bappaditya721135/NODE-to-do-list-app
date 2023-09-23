import mongoose from "mongoose";



export const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {dbName: "NODE-to-do-list-app"}).then((c) => {
    console.log(`database connected with ${c.connection.host}`)
}).catch(err => {
    console.log(err)
})
}


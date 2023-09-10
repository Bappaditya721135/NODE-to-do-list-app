import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export const UserModel = mongoose.model("UserModel", schema)
import  jwt  from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(404).json({
            success: false,
            message: "user not logged in"
        })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.user = await UserModel.findById(decodedToken._id)
    next()
}
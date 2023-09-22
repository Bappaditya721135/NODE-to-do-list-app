import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// userModel 
import { UserModel } from "../models/userModel.js";
import ErrorHandler from "../middleware/errorHandler.js"





export const userRegister =  async(req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const isUserExist = await UserModel.findOne({email})
            if(!isUserExist) return next(new ErrorHandler("something went wrong", 500))
            if(isUserExist) {
                return res.status(404).json({
                    success: false,
                    message: "user already exist"
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name, email, password: encryptedPassword})
            if(!user) return next(new ErrorHandler("something went wrong creating user", 500))
            const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
            res.status(200).cookie("token", token, {maxAge: 5*60*1000}).json({
                success: true,
                user,
            })
        } catch (error) {
            next(error)
        }
    }



export const userLogin = async(req, res, next) => {
    // console.log(req.user)
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email}).select("+password")
        if(!user) return next(new ErrorHandler("user does not exist", 404))
        const passwordVerify = await bcrypt.compare(password, user.password)
        if(!passwordVerify) return next(new ErrorHandler("incorrect passwor", 401))
        const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
        res.status(200).cookie("token", token).json({
            success: true,
            message: "login successfull"
        })
    } catch (error) {
        next(error)
    }
}


export const userLogout = async (req, res) => {
    res.status(200).cookie("token",null, {maxAge: 0}).json({
        success: true,
        message: "logout successfull"
    })
}
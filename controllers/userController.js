import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// userModel 
import { UserModel } from "../models/userModel.js";
import ErrorHandler from "../middleware/errorHandler.js"

// set cookie function 
import { setCookie } from "../utils/setCookie.js";





export const userRegister =  async(req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const isUserExist = await UserModel.findOne({email})
            // check if the user already exist 
            if(isUserExist) {
                return res.status(404).json({
                    success: false,
                    message: "user already exist"
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name, email, password: encryptedPassword})
            if(!user) return next(new ErrorHandler("something went wrong creating user", 500))
    
            // setting cookie and sending res 
            setCookie(user, res, 200, "user registration successfull ")

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
        // setting cookie and sending res 
        setCookie(user, res, 200, "login successfull")
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
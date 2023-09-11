import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// userModel 
import { UserModel } from "../models/userModel.js";


const jwt_secrect = process.env.JWT_SECRECT;


export const userRegister =  async(req, res) => {
        const {name, email, password} = req.body;
        const isUserExist = await UserModel.findOne({email})
        if(isUserExist) {
            return res.status(404).json({
                success: false,
                message: "user already exist"
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({name, email, password: encryptedPassword})
        const token = jwt.sign({_id: user._id}, jwt_secrect)
        res.status(200).cookie("token", token, {maxAge: 5*60*1000}).json({
            success: true,
            user,
        })
    }



export const userLogin = async(req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email}).select("+password")
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user does not exist register first"
        })
    }
    const passwordVerify = await bcrypt.compare(password, user.password)
    if(!passwordVerify) {
        return res.status(404).json({
            success: false,
            message: "incorrect password"
        })
    }
    const token = jwt.sign({_id: user._id}, jwt_secrect)
    res.status(200).cookie("token", token).json({
        success: true,
        message: "login successfull"
    })
}


export const userLogout = async (req, res) => {
    res.status(200).cookie("token",null, {maxAge: 0}).json({
        success: true,
        message: "logout successfull"
    })
}
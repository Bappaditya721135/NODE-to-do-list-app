import jwt from "jsonwebtoken";


export const setCookie = (user, res, statusCode, message) => {
    console.log(process.env.JWT_SECRECT)
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    return res.status(statusCode).cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
        }).json({
            success: true,
            message,
        })
}
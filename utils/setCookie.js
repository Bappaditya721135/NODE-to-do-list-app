import jwt from "jsonwebtoken";


export const setCookie = (user, res, statusCode, message) => {
    return res.status(statusCode).cookie("token", "flejofe", {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
        }).json({
            success: true,
            message,
        })
}
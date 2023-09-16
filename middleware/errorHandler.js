export const errorHandler = (err, req, res, next) => {
    err.message = err.message || "internal server error"
    err.statusCode = err.statusCode || 500
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


// custom error class or constructor function 
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export default ErrorHandler;
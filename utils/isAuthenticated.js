export const isAuthenticated = (req, res, next) => {
    console.log(req.cookies)
    next()
    // this function will run isn 
}
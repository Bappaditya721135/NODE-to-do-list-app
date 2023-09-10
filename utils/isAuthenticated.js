export const isAuthenticated = (req, res, next) => {
    console.log(req.cookies)
    next()
}
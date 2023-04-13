const { verifyToken } = require("../services/userService")

module.exports = () => (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        // console.log(token)
        try {
            const userData = verifyToken(token)
            // console.log("Read successful, user", userData.username)
            req.user = userData
            req.locals.username = userData.username
            req.locals.email = userData.email
        } catch (error) {
            // console.log("Invalid token")
            res.clearCookie("token")
            res.redirect("/auth/login")
            return
        }
    }

    next()
}
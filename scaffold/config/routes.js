const authController = require("../controllers/auth")
const homeController = require("../controllers/home")

module.exports = (app) => {
    app.use("/", homeController)
    app.use("/auth", authController)

    /*
    // calling next with a param => Global error handling
    app.get("/error", (req, res, next) => {
        next(new Error("propagating error"))
    })
    // calling next for a synchronous exception => Global error handling
    app.get("/error", (req, res, next) => {
        throw new Error("propagating error")
    })
    // killing the app => need ot restart it manually
    app.get("/error", async (req, res) => {
        throw new Error("propagating error")
    })
    */

    /*
    // Can occur in case of synchronous exception, or we have called next in a prev controller and pass it an error param or whatever param
    app.use((err, req, res, next) => {
        console.log("Global error handling")
        console.log(err.message)
        res.redirect("/") // TODO: Check requirements
    })
    */
}
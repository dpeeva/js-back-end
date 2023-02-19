const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const catalogController = require("../controllers/catalog")
const profileController = require("../controllers/profile")
const { hasUser } = require("../middlewares/guards")

module.exports = (app) => {
    app.use("/", homeController)
    app.use("/auth", authController)
    app.use("/catalog", hasUser(), catalogController)
    app.use("/profile", profileController)

    app.use((err, req, res, next) => {
        console.log("Global error handling")
        console.log(err.message)
        res.redirect("/") // TODO: Check requirements
    })
}
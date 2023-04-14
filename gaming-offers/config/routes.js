const authController = require("../controllers/authController")
const homeController = require("../controllers/homeController")
const gameController = require("../controllers/gameController")
const searchController = require("../controllers/searchController")


module.exports = (app) => {
    app.use("/", homeController)
    app.use("/auth", authController)
    app.use("/games", gameController)
    app.use("/search", searchController)

    // test global error
    // if callback is async app will stop responding because of our global error handling
    app.get("/error", (req, res, next) => {
        next(new Error("propagating error"))
    })

    app.use((err, req, res, next) => {
        console.log("Global error handling")
        console.log(err.message)
        res.redirect("/")
    })

    app.use("/*", (req, res) => {
        res.render("404")
    })
}
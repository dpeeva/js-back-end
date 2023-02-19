const homeController = require("express").Router()

// TODO: Replace with real controller according to assignment
homeController.get("/", (req, res) => {
    res.render("home", {
        title: "Home Page",
        user: req.user, // will be undefined in case of no session
    })
})

module.exports = homeController
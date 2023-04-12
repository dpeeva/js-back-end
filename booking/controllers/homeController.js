const homeController = require("express").Router()

// TODO: replace with real controller, according to assignment
homeController.get("/", (req, res) => {
    res.render("home", {
        // passing context:
        title: "Home Page"
    })
})

module.exports = homeController
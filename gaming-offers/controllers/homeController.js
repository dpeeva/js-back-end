const homeController = require("express").Router()


// TODO: replace by real controller logic 
homeController.get("/", (req, res) => {
    res.render("home", {
        title: "Home Page",
        user: req.user
    })
})

module.exports = homeController
const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const cookieParser = require("cookie-parser")

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: "hbs",
    })
    app.set("views", path.join(__dirname, "../views"))
    app.engine(".hbs", hbs.engine)
    app.set("view engine", ".hbs")

    app.use(
        // path.resolve(__dirname, "../scaffold/static/index.html"),
        "/static",
        express.static("static")
    )
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
}
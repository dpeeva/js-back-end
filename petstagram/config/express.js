const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("../middlewares/session")
const trimBody = require("../middlewares/trimBody")

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: "hbs",
    })
    app.set("views", path.join(__dirname, "../views"))
    app.engine(".hbs", hbs.engine)
    app.set("view engine", ".hbs")

    app.use(
        path.resolve(__dirname, "/static"),
        express.static("static")
    )
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(session())
    app.use(trimBody())
}
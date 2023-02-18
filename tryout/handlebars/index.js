const express = require("express")
const hbr = require("express-handlebars")


const app = express()
const handlebars = hbr.create({
    extname: ".hbs"
})
app.engine(".hbs", handlebars.engine)
app.set("view engine", ".hbs")

app.get("/", (req, res) => {
    // res.send("ok")
    // res.render("<h1>Hello there</h1>") // Failed to lookup view "<h1>Hello there</h1>" in views directory
    res.render("home", {
        // layout: false,
        message: "Hello",
        response: "General Kenobi",
    })
})

app.listen(3000)
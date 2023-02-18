const express = require("express")
const hbr = require("express-handlebars")


const app = express()
const handlebars = hbr.create({
    extname: ".hbs"
})
app.engine(".hbs", handlebars.engine)
app.set("view engine", ".hbs")

app.get("/", (req, res) => {
    // res.locals.message = "Hello"
    // res.locals.response = "General Kenobi"

    res.render("home", {
        // layout: false,
        username: "Peter",
        message: "Hello",
        response: "General Kenobi",
        title: "Handlebars Demo",
        product: {
            name: "Product Name",
            price: 0.5,
            color: "Beige",
        },
        contacts: [
            {
                name: "Peter",
                email: "peter@abv.bg",
            },
            {
                name: "Mary",
                email: "mary@abv.bg",
            },
            {
                name: "John",
                email: "john@abv.bg",
            },
        ]
    })
})

app.listen(3000)
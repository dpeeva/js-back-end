const express = require("express")
const path = require("path")

const app = express()

app.get("/", (req, res) => {
    // res.send("Hello there")
    res.sendFile(
        path.resolve(__dirname, "../express/index.html"),
    )
})

app.route("/create")
    .get((req, res) => {
        res.send(
            "<form method='POST'><input name='name'><button>Send</button></form>"
        )
    })
    .post((req, res) => {
        console.log("Handling POST request")
        res.redirect("/catalog")
    })

app.get("/catalog", (req, res) => {
    res.send("Catalog Page")
})

app.get("/catalog/:productId", (req, res) => {
    console.log(req.params.productId)
    res.send("Product Details Page")
})

app.get("/catalog/:category/:id", (req, res) => {
    console.log(req.params)
    res.send("Nested Parameters: " + req.params.category + ", " + req.params.id)
})

app.get("/data", (req, res) => {
    res.json([
        {
            name: "Peter",
            age: 25
        },
        {
            name: "John",
            age: 31
        }
    ]) // data already stringified for us
})

app.all("*", (req, res) => {
    res.status(404).send("404 Not Found (Custom Page)")
})

app.listen(3000)
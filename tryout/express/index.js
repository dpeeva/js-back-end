const express = require("express")
const path = require("path")
// const { create, middleware } = require("./controllers/create")
const create = require("./controllers/create")
const catalog = require("./controllers/catalog")

const app = express()

app.get("/", (req, res) => {
    // res.send("Hello there")
    res.sendFile(
        path.resolve(__dirname, "../express/index.html"),
    )
})

app.get("/img", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../express/cat.jpg"),
    )
})
app.get("/img_downoad", (req, res) => {
    res.download(
        path.resolve(__dirname, "../express/cat.jpg"),
    )
})

app.use((req, res, next) => {
    console.log("Apply Middleware to every URL address of the App")
    console.log(">>>", req.method, req.url)
    next()
})

app.use("/create", create)
// app.use("/create", middleware, create)
app.use("/catalog",
    (req, res, next) => {
        console.log(">>>", req.method, req.url)
        next()
    },
    catalog
)

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
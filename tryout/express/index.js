const express = require("express")
const path = require("path")
const create = require("./controllers/create")
const catalog = require("./controllers/catalog")
const logger = require("./middleware/logger")

const app = express()

app.use(express.static("static"))

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

app.use(logger())

app.use("/create", create)
app.use("/catalog", catalog)

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
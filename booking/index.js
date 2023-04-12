const express = require("express")
const expressConfig = require("./config/express")

start()

async function start() {
    const app = express()

    // execute config
    expressConfig(app)
}
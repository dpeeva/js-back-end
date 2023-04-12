const express = require("express")
const expressConfig = require("./config/express")
const databaseConfig = require("./config/database")

start()

async function start() {
    const app = express()

    // execute config
    expressConfig(app)
    await databaseConfig(app)
}
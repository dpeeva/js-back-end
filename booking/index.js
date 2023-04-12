const express = require("express")
const expressConfig = require("./config/express")
const databaseConfig = require("./config/database")
const routesConfig = require("./config/routes")

const PORT = 3000

start()

async function start() {
    const app = express()

    // execute config
    expressConfig(app)
    await databaseConfig(app)
    routesConfig(app)

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}
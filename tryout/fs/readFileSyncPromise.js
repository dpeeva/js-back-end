const fs = require("fs").promises // we can also import fs like that: const { promises: fs } = require("fs")
const path = require("path")

start()

async function start() {
    const data = await fs.readFile(
        path.resolve(__dirname, "demo.txt")
    )
    console.log(data)
}
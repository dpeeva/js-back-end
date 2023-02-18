const fs = require("fs")
const path = require("path")

const text = fs.readFileSync(
    path.resolve(__dirname, "demo.txt")
)

console.log(text.toString())
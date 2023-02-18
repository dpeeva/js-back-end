const fs = require("fs")
// const path = require("path")

// const result = fs.readdirSync(path.resolve(__dirname))
const result = fs.readdirSync(".")

for (const item of result) {
    if (fs.statSync(`./${item}`).isDirectory()) {
        console.log(item, "is a directory")
    } else {
        console.log(item, "is a file")
    }
}

console.log(result)
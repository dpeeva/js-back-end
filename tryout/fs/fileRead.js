const fs = require("fs")
const path = require("path")

fs.readFile(
    path.resolve(__dirname, "demo.txt"),
    (err, data) => {
        if (err != null) {
            return console.error(err.message)
        }
        console.log(data.toString())
    }
)
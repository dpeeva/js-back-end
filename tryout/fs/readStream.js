const fs = require("fs")
const path = require("path")

const stream = fs.createReadStream(
    path.resolve(__dirname, "../../summary.txt"),
    {
        highWaterMark: 3  // flush stream on every 3 chars
    }
)

const file = []

stream.on("data", chunk => {
    // console.log(chunk)
    file.push(chunk)
})
stream.on("end", () => {
    console.log("File completed")
    console.log(file.join(""))
})

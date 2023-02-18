const fs = require("fs")

const result = fs.readdirSync(".")

const output = []

for (const item of result) {
    if (fs.statSync(`./${item}`).isDirectory()) {
        output.push(item + " is a directory")
    } else {
        output.push(item + " is a file")
    }
}

fs.writeFileSync("./summary.txt", output.join("\n"), "utf-8")
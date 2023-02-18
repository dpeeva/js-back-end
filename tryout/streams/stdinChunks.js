// test data coming from console: type in the console and press Enter

const result = []

process.stdin.on("data", (chunk) => {
    result.push(chunk)
})

// No end event is available for the console
process.stdin.on("end", () => {
    console.log(result.join(""))
})
// test data coming from console: type in the console and press Enter

process.stdin.on("data", (data) => {
    console.log(data.toString())
})
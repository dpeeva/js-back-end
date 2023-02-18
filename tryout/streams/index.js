const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
    if (req.method == "GET") {
        if (req.url == "/index.html") {
            // const fileStream = fs.createReadStream(
            //     path.resolve(__dirname, "../streams/static/index.html"),
            // )
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            fs.createReadStream(
                path.resolve(__dirname, "../streams/static/index.html"),
            ).pipe(res)
            // fileStream.on("data", chunk => res.write(chunk))
            // fileStream.on("end", () => res.end())
        } else {
            res.writeHead(404)
            res.write("Not found")
            res.end()
        }

    } else if (req.method == "POST") {
        const body = []
        req.on("data", chunk => {
            body.push(chunk)
        })
        req.on("end", () => {
            const result = JSON.parse(body.join(""))
            console.log(result)

            result.count++

            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            res.write(JSON.stringify(result))
            res.end()
        })
    }
})

server.listen(3000)
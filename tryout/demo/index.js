const http = require("http")

const homePage = `
<!DOCTYPE html>
<html lang="en">
<body>
    <a href="/about">About</a>
    <h1>Home Page</h1>
    <p>Welcome to our site</p>
</body>
</html>
`
const aboutPage = `
<!DOCTYPE html>
<html lang="en">
<body>
    <a href="/">Home</a>
    <h1>About Us</h1>
    <p>Contact: +1-555-1973</p>
</body>
</html>
`

const server = http.createServer((request, response) => {
    console.log(">>>", request.method, request.url)

    const url = new URL(request.url, `http://${request.headers.host}`)
    console.log(url)

    if (url.pathname == "/") {
        response.write(homePage)
        response.end()
    } else if (url.pathname == "/about") {
        response.write(aboutPage)
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }
})

server.listen(3000)
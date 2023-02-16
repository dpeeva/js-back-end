const http = require("http")

const homePage = `
    <h1>Home Page</h1>
    <p>Welcome to our site</p>
`
const aboutPage = `
    <h1>About Us</h1>
    <p>Contact: +1-555-1973</p>
`
const defaultPage = `
    <h1>404</h1>
    <p>Not found</p>
`

const routes = {
    "/": homePage,
    "/about": aboutPage,
}

const server = http.createServer((request, response) => {
    console.log(">>>", request.method, request.url)

    const url = new URL(request.url, `http://${request.headers.host}`)
    console.log(url)

    const page = routes[url.pathname]

    if (page !== undefined) {
        response.write(html(page))
        response.end()
    } else {
        response.statusCode = 404
        response.write(html(defaultPage))
        response.end()
    }
})

server.listen(3000)

function html(body) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <body>
        <nav>
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>
            <a href="/about">About</a>
        </nav>
        ${body}
    </body>
    </html>
    `
}
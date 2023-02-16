const http = require("http")

function homePage(req, res) {
    res.write(html(`
        <h1>Home Page</h1>
        <p>Welcome to our site</p>
    `))
    res.end()
}
function aboutPage(req, res) {
    res.write(html(`
        <h1>About Us</h1>
        <p>Contact: +1-555-1973</p>
    `))
    res.end()
}
function catalogPage(req, res) {
    res.write(html(`
        <h1>Catalog</h1>
        <p>List of items</p>
    `))
    res.end()
}
function defaultPage(req, res) {
    res.statusCode = 404
    res.write(html(`
        <h1>404</h1>
        <p>Not found</p>
    `))
    res.end()
}

const routes = {
    "/": homePage,
    "/about": aboutPage,
    "/contact": catalogPage,
}

const server = http.createServer((request, response) => {
    console.log(">>>", request.method, request.url)

    const url = new URL(request.url, `http://${request.headers.host}`)
    console.log(url)

    const handler = routes[url.pathname]

    if (typeof handler == "function") {
        handler(request, response)
    } else {
        defaultPage(request, response)
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
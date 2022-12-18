const { html } = require("./util")

// Routes map
const routes = {}

const defaultPage = `
<h1>404 Not Found</h1>
<p>The resource you requested cannot be found.</p>
`

function defaultController(req, res) {
    res.statusCode = 404
    res.write(html(defaultPage))
    res.end()
}

function main(req, res) {
    console.log(">>>", req.method, req.url)

    const url = new URL(req.url, `http://${req.headers.host}`)

    const handler = match(url)
    if (typeof handler == "function") {
        handler(req, res)
    } else {
        defaultController(req, res)
    }
    return handler
}

function match(url) {
    const handler = routes[url.pathname]
    return handler
}

module.exports = {
    main,
    routes
}
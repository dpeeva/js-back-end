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

    let handler
    const actions = routes[url.pathname]
    if (actions) {
        handler = actions[req.method]
    }
    if (typeof handler == "function") {
        handler(req, res)
    } else {
        defaultController(req, res)
    }
}

function register(method, pathname, handler) {
    if (routes[pathname] == undefined) {
        routes[pathname] = {}
    }
    routes[pathname][method] = handler
}

module.exports = {
    main,
    register
}
const { html } = require("./util")

// Routes map
const routes = {}

const defaultPage = `
<h1>404 Not Found</h1>
<p>The resource you requested cannot be found.</p>
`

function defaultController(request, response) {
    response.statusCode = 404
    response.write(html(defaultPage))
    response.end()
}

function main(request, response) {
    console.log(">>>", request.method, request.url)

    const url = new URL(request.url, `http://${request.headers.host}`)

    let handler
    const actions = routes[url.pathname]
    if (actions) {
        handler = actions[request.method]
    }
    if (typeof handler == "function") {
        handler(request, response)
    } else {
        defaultController(request, response)
    }
}

function register(method, pathname, handler) {
    if (routes[pathname] == undefined) {
        routes[pathname] = {}
    }
    routes[pathname][method] = handler
}

function get(pathname, handler) {
    register("GET", pathname, handler)
}

function post(pathname, handler) {
    register("POST", pathname, handler)
}

module.exports = {
    main,
    register,
    get,
    post
}
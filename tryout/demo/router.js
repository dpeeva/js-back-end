const routes = {}

function register(path, handler) {
    routes[path] = handler
}

function match(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`)
    const handler = routes[url.pathname]

    if (typeof handler == "function") {
        handler(request, response)
    } else {
        routes.default(request, response) // if no default route, we will get an exception
    }
}

module.exports = {
    register,
    match
}
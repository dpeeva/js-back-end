const routes = {}

function register(method, path, handler) {
    if (routes[path] === undefined) {
        routes[path] = {}
    }
    routes[path][method] = handler
}

function match(request, response) {
    console.log(routes)
    console.log(">>>", request.method, request.url) // check what the client requested
    const url = new URL(request.url, `http://${request.headers.host}`)
    const actions = routes[url.pathname]

    let handler

    if (actions !== undefined) {
        handler = actions[request.method]
    }

    if (typeof handler == "function") {
        handler(request, response)
    } else {
        routes.default["GET"](request, response) // if no default route, we will get an exception
    }
}

module.exports = {
    register,
    // get: (path, handler) => register("GET", path, handler),
    get: register.bind(null, "GET"),
    post: register.bind(null, "POST"),
    match
}
const http = require("http")
const { aboutPage } = require("./controllers/aboutController")
const { homePage } = require("./controllers/homeController")
const { catalogPage } = require("./controllers/catalogController")
const { defaultPage } = require("./controllers/defaultController")

const routes = {
    "/": homePage,
    "/about": aboutPage,
    "/contact": catalogPage,
}

const server = http.createServer((request, response) => {
    console.log(">>>", request.method, request.url)

    const url = new URL(request.url, `http://${request.headers.host}`)
    // console.log(url)

    const handler = routes[url.pathname]

    if (typeof handler == "function") {
        handler(request, response)
    } else {
        defaultPage(request, response)
    }
})

server.listen(3000)
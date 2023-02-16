const http = require("http")
const router = require("./router")
const { aboutPage } = require("./controllers/aboutController")
const { homePage } = require("./controllers/homeController")
const { catalogPage } = require("./controllers/catalogController")
const { defaultPage } = require("./controllers/defaultController")

router.register("/", homePage)
router.register("/about", aboutPage)
router.register("/catalog", catalogPage)
router.register("default", defaultPage)


const server = http.createServer((request, response) => {
    console.log(">>>", request.method, request.url)
    router.match(request, response)
})

server.listen(3000)
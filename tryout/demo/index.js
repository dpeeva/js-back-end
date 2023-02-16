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

const server = http.createServer(router.match)

server.listen(3000)
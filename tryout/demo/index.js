const http = require("http")
const router = require("./router")
const { aboutPage } = require("./controllers/aboutController")
const { homePage } = require("./controllers/homeController")
const { catalogPage, createPage } = require("./controllers/catalogController")
const { defaultPage } = require("./controllers/defaultController")

router.get("/", homePage)
router.get("/about", aboutPage)
router.get("/catalog", catalogPage)
router.get("/create", createPage)
router.post("/create", createPage)
router.get("default", defaultPage)

const server = http.createServer(router.match)

server.listen(3000)
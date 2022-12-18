const http = require("http") // used to create Node server
const { homeController } = require("./controllers/homeController")
const { aboutController } = require("./controllers/aboutController")
const { catalogController } = require("./controllers/catalogController")

const router = require("./router")

// event is always a request
const server = http.createServer(router.main)

router.get("/", homeController)
router.get("/about", aboutController)
router.get("/catalog", catalogController)

server.listen(3000)
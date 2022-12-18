const http = require("http") // used to create Node server

const router = require("./router")
const { html } = require("./util")

// Views should come from a separate place

const homePage = `
<h1>Home</h1>
<p>Main information</p>
`

const aboutPage = `
<h1>About us</h1>
<p>Contact information</p>
`

const catalogPage = `
<h1>Catalog</h1>
<p>List of items</p>
`

// event is always a request
const server = http.createServer(router.main)

router.register("/", homeController)
router.register("/about", aboutController)
router.register("/catalog", catalogController)

server.listen(3000)

// Controllers should come from a separate place

function homeController(req, res) {
    res.write(html(homePage))
    res.end()
}

function aboutController(req, res) {
    res.write(html(aboutPage))
    res.end()
}

function catalogController(req, res) {
    res.write(html(catalogPage))
    res.end()
}
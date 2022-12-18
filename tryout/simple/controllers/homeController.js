const { html } = require("../util")

const homePage = `
<h1>Home</h1>
<p>Main information</p>
`

function homeController(req, res) {
    res.write(html(homePage))
    res.end()
}

module.exports = {
    homeController
}
const { html } = require("../util")

const aboutPage = `
<h1>About us</h1>
<p>Contact information</p>
`

function aboutController(req, res) {
    res.write(html(aboutPage))
    res.end()
}

module.exports = {
    aboutController
}
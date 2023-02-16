const { html } = require("../util")

function aboutPage(req, res) {
    res.write(html(`
        <h1>About Us</h1>
        <p>Contact: +1-555-1973</p>
    `, "about"))
    res.end()
}

module.exports = {
    aboutPage
}
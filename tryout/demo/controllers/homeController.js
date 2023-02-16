const { html } = require("../util")

function homePage(req, res) {
    res.write(html(`
        <h1>Home Page</h1>
        <p>Welcome to our site</p>
    `, "home"))
    res.end()
}

module.exports = {
    homePage
}
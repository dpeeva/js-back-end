const { html } = require("../util")

function defaultPage(req, res) {
    res.statusCode = 404
    res.write(html(`
        <h1>404</h1>
        <p>Not found</p>
    `, "404"))
    res.end()
}

module.exports = {
    defaultPage
}
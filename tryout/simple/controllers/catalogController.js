const { html } = require("../util")

const catalogPage = `
<h1>Catalog</h1>
<p>List of items</p>
`

function catalogController(req, res) {
    res.write(html(catalogPage))
    res.end()
}

module.exports = {
    catalogController
}
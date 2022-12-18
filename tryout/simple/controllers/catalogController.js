const { data, html } = require("../util")

const catalogPage = `
<h1>Catalog</h1>
<ul>
    ${data.map(item => `<li>${item.name} - ${item.color}</li>`).join("\n")}
</ul>
`

function catalogController(req, res) {
    res.write(html(catalogPage))
    res.end()
}

module.exports = {
    catalogController
}
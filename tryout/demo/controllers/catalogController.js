const { html, data } = require("../util")

function catalogPage(req, res) {
    res.write(html(`
        <h1>Catalog</h1>
        <p>List of items</p>
        <ul>
            ${data.map(item => `<li>${item.name} - ${item.color}</li>`).join("\n")}
        </ul>
    `, "catalog"))
    res.end()
}

module.exports = {
    catalogPage
}
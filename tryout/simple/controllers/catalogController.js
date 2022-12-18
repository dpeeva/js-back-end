const { data, html } = require("../util")

const catalogPage = `
<h1>Catalog</h1>
<form method="POST" action="/create">
    <label>Name: <input type="text" name="name" /></label>
    <label>Color:
        <select name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
        </select>
    </label>
    <input type="submit" value="Create item" />
</form>
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
const { html, data } = require("../util")

function catalogPage(request, response) {
    response.write(html(`
        <h1>Catalog</h1>
        <p>List of items</p>
        <ul>
            ${data.map(item => `<li>${item.name} - ${item.color}</li>`).join("\n")}
        </ul>
    `, "catalog"))
    response.end()
}

function createPage(request, response) {
    response.write(`
        <h1>Create Item</h1>
        <form>
            <label>Name: <input type="text" name="name" /></label>
            <label>Color:
                <select name="color">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </select>
            </label>
            <input type="submit" value="Create" />
        </form>
    `)
    response.end()
}

module.exports = {
    catalogPage,
    createPage
}
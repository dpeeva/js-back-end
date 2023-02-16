function html(body, title = "Demo site") {
    return `
    <!DOCTYPE html>
    <head>
        <title>${title}</title>
    </head>
    <html lang="en">
    <body>
        <nav>
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>
            <a href="/create">Create</a>
            <a href="/about">About</a>
        </nav>
        ${body}
    </body>
    </html>
    `
}

const data = [
    {
        id: "product_1",
        name: "Product 1",
        color: "Red",
    },
    {
        id: "product_2",
        name: "Product 2",
        color: "Green",
    }
]

module.exports = {
    html,
    data
}
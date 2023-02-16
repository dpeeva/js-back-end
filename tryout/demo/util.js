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
            <a href="/about">About</a>
        </nav>
        ${body}
    </body>
    </html>
    `
}

module.exports = {
    html,
}
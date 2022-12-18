function html(body, title = "Hello") {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${title}</title>
            </head>
            <body>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/catalog">Catalog</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
                ${body}
            </body>
        </html>
    `
}

module.exports = {
    html
}
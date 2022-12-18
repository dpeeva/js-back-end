const { IncomingMessage, ServerResponse } = require("http")

/**
 * 
 * @param { IncomingMessage } req 
 * @param { ServerResponse } res 
 */

function createController(req, res) {
    console.log("create request")

    res.writeHead(301, {
        "Location": "/catalog"
    })
    res.end()
}

module.exports = {
    createController
}
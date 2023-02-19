function parseError(error) {
    // return error.message.split("\n")

    if (error.name == "ValidationError") {
        // then it's a Mongoose error
        return Object.values(error.errors).map(v => v.message)
    } else {
        // then it's an error we have registered
        return error.message.split("\n")
    }
}

module.exports = {
    parseError,
}
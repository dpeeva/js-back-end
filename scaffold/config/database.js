const mongoose = require("mongoose")
mongoose.set("strictQuery", true) // to avoid deprecation warning

// TODO: change db name, according to assignment
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/scaffoldDb"

module.exports = async (app) => {
    try {
        await mongoose.connect(
            CONNECTION_STRING,
            {
                writeConcern: {
                    wtimeout: 2500 // estimated time, then request will timeout
                },
                useNewUrlParser: true, // to avoid deprecation warning
                useUnifiedTopology: true,
            }
        )
        console.log("Database connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}
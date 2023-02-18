const mongoose = require("mongoose")

const connectionString = "mongodb://127.0.0.1:27017/local"

start()

async function start() {
    await mongoose.connect(
        connectionString,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true // to avoid deprecation warning
        }
    )

    console.log("Database connected")
}

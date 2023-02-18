const mongoose = require("mongoose")
const Person = require("./models/Person")

mongoose.set("strictQuery", true)

const connectionString = "mongodb://127.0.0.1:27017/testdb"

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

    const person = new Person({
        name: "Val",
        age: -5,
    })


    await person.save()

    const data = await Person.find({})
    console.log(data)

    await mongoose.disconnect()
}

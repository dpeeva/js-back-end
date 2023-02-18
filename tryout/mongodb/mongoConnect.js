const mongodb = require("mongodb")

const connectionString = "mongodb://127.0.0.1:27017"

start()

async function start() {
    // Get access to Mongo client
    const MongoClient = new mongodb.MongoClient(connectionString, {
        writeConcern: {
            wtimeout: 2500 // estimated time, then request will timeout
        },
        useUnifiedTopology: true
    })

    await MongoClient.connect()


    const db = MongoClient.db("local")
    const collection = db.collection("startup_log")
    const query = collection.find({})
    const data = await query.toArray()
    console.log(data)
}
